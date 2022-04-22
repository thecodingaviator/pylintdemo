/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { unscapeCode } from '../assets/utilFunctions';

import QuizComponent from './QuizComponent';
import './DetailsSummary.scss';

export default function DetailsSummary(props) {
  const { str, errormd } = props;
  const [show, setShow] = React.useState(false);

  let splitStr = str.substring(15);
  splitStr = splitStr.split(':');
  splitStr[3] = splitStr[3].substring(0, splitStr[3].indexOf(' ('));

  return (
    <details>
      <summary>
        {`At line ${splitStr[0]} character ${splitStr[1]}: ${splitStr[3]}`}
      </summary>
      {errormd && (
        <div className={`quiz-carousel ${show ? 'quiz-carousel-fade' : ''}`}>
          <ReactMarkdown
            components={{
              // eslint-disable-next-line react/no-unstable-nested-components
              code({
                node, inline, className, children, ...innerProps
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
                  <code className={className} {...innerProps}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {unscapeCode(errormd.md)}
          </ReactMarkdown>
          <Row className="mb-2">
            <Col sm={{ span: 2, offset: 10 }}>
              <Button
                variant="primary"
                className="w-100"
                onClick={() => {
                  setShow(!show);
                }}
              >
                Quiz
              </Button>
            </Col>
          </Row>
          <QuizComponent errormd={errormd} />
        </div>
      )}
    </details>
  );
}
