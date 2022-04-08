/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { oneDark } from '@codemirror/theme-one-dark';
import { python } from '@codemirror/lang-python';

import { Alert } from 'bootstrap';

import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

import './Editor.css';

export default function Editor() {
  const [value, setValue] = React.useState('print(\'hello world!\')');
  const [responseContent, setResponseContent] = React.useState('');
  const [inProgress, setInProgress] = React.useState(false);
  const [link, setLink] = React.useState('');
  const [error, setError] = React.useState(undefined);
  const { currentUID } = useAuth();

  const { addScore, getScores, getAllErrors } = useAuth();

  function handleChange(newValue) {
    setValue(newValue);
  }

  useEffect(() => {
    if (currentUID) {
      setLink(`/view/${currentUID}`);
    }
  }, [currentUID]);

  async function handleSubmit(event) {
    event.preventDefault();

    setInProgress(true);
    setResponseContent('');

    await getScores().then((resGetScores) => {
      const scores = resGetScores.score;

      let code = value;
      /* Escape all backslashes in code */
      code = code.replace(/\\/g, '\\\\');
      /* Escape all quotes in code */
      code = code.replace(/'/g, "\\'");
      code = code.replace(/"/g, '\\"');
      /* Escape all newlines in code */
      code = code.replace(/\n/g, '\\n');
      /* Escape all tabs in code */
      code = code.replace(/\t/g, '\\t');
      /* Escape all carriage returns in code */
      code = code.replace(/\r/g, '\\r');
      /* Escape all linefeeds in code */
      code = code.replace(/\f/g, '\\f');

      const reqOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
        }),
      };

      let response = '';
      fetch('https://plump-linen-binder.glitch.me/code', reqOptions)
        .then((resGlitch) => resGlitch.json())
        .then((res) => {
          response = res.code;
          const rating = response.substring(response.indexOf('Your code has been rated'));
          response = response.substring(0, response.indexOf(',------------------'));
          response = response.substring(19 + 33);

          getAllErrors().then((resGetAllErrors) => {
            const errors = resGetAllErrors;

            const regex = /,(?![^()]*\))/;
            response = response.split(regex);

            if (response.length === 1 && response[0] === '') {
              response = [];
            }

            response = response.map((str) => {
              const errorCode = str.substring(str.indexOf('C'), str.indexOf('C') + 5);
              const errorMd = errors.find((errorItem) => errorItem.id === errorCode);

              return (
                <details>
                  <summary>
                    {str.substring(15, 15 + str.substring(15).indexOf('('))}
                  </summary>
                  {errorMd && (
                    <ReactMarkdown
                      components={{
                        // eslint-disable-next-line react/no-unstable-nested-components
                        code({
                          node, inline, className, children, ...props
                        }) {
                          const match = /language-(\w+)/.exec(className || '');
                          return !inline && match ? (
                            <SyntaxHighlighter
                              style={tomorrow}
                              language={match[1]}
                              PreTag="div"
                              {...props}
                            >
                              {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                          ) : (
                            <code className={className} {...props}>
                              {children}
                            </code>
                          );
                        },
                      }}
                    >
                      {errorMd.md
                        .replace(/\\n/g, '\n')
                        .replace(/\\t/g, '\t')
                        .replace(/\\r/g, '\r')
                        .replace(/\\"/g, '"')
                        .replace(/\\'/g, "'")}
                    </ReactMarkdown>
                  )}
                </details>
              );
            });

            response.push(<h3 className="w-100 text-center mb-5">{rating}</h3>);

            const ratingScore = parseFloat(rating.substring(rating.indexOf('Your code has been rated at ') + 28, rating.indexOf('/10.00')));
            setResponseContent(response);

            try {
              addScore(`${scores},${ratingScore}`);
            } catch (errorMessage) {
              setError(errorMessage);
            }

            setInProgress(false);
          });
        });
    });
  }

  return (
    <div className="form-container">
      <div className="form-group">
        {error && <Alert variant="danger">{error}</Alert>}
        <CodeMirror
          value="print('hello world!')"
          height="60vh"
          theme={oneDark}
          extensions={[python()]}
          onChange={handleChange}
        />
        <input type="submit" value="Submit" className="btn btn-primary mt-3 mb-3 mx-auto" disabled={inProgress} onClick={handleSubmit} />
        <Link to={link} className="mb-5">
          <button className="btn btn-primary w-100" type="button">
            Click here to view your scores!
          </button>
        </Link>
        <div id="result">
          {responseContent}
        </div>
      </div>
    </div>
  );
}
