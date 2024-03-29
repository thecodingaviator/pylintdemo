/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { oneDark } from '@codemirror/theme-one-dark';
import { python } from '@codemirror/lang-python';

import { Alert } from 'bootstrap';

import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

import './Editor.css';
import DetailsSummary from './DetailsSummary';
import { escapeCode } from '../../assets/utilFunctions';

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

      const code = escapeCode(value);

      const linesofCode = value.split(/\r\n|\r|\n/).length;

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

            const regex = /,s/g;
            response = response.split(regex);

            if (response.length === 1 && response[0] === '') {
              response = [];
            }

            response = response.map((str) => {
              const startIndex = str.indexOf(': ') + 2;
              const endIndex = str.indexOf(': ', startIndex + 2);
              const errorCode = str.substring(startIndex, endIndex);

              const errormd = errors.find((errorItem) => errorItem.id === errorCode);

              // replace representations with emojis and remove resources
              if (errormd && errormd.md) {
                errormd.md = errormd.md.replace(':x:', '❌').replace(':heavy_check_mark:', '✅');
                if (errormd.md.indexOf('Related resources') !== -1) {
                  errormd.md = errormd.md.substring(0, errormd.md.indexOf('Related resources'));
                }
              }

              return (
                <DetailsSummary str={str} errormd={errormd} errorCode={errorCode} />
              );
            });

            response.push(<h3 className="w-100 text-center mb-5">{rating}</h3>);
            setResponseContent(response);

            const ratingScore = Math.floor(((response.length - 1) / linesofCode) * 100);

            if (ratingScore) {
              try {
                addScore(`${scores || 0},${ratingScore}`);
              } catch (errorMessage) {
                setError(errorMessage);
              }
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
