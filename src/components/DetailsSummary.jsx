/* eslint-disable react/prop-types */
import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

import QuizComponent from './QuizComponent';
import './DetailsSummary.scss';
import ReactMarkdownComponent from './ReactMarkdownComponent';

export default function DetailsSummary(props) {
  const { str, errormd } = props;
  const [show, setShow] = React.useState(false);

  const splitStr = str.substring(15).split(':');
  splitStr[3] = splitStr[3].substring(0, splitStr[3].indexOf(' ('));

  return (
    <details>
      <summary>
        {`At line ${splitStr[0]} character ${splitStr[1]}: ${splitStr[3]}`}
      </summary>
      {errormd && (
        <>
          {!show && (
            <div className={`quiz-carousel ${show ? 'quiz-carousel-fade' : ''}`}>
              <ReactMarkdownComponent md={errormd.md} />
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
            </div>
          )}
          {(show && (
            <QuizComponent errormd={errormd} />
          ))}
        </>
      )}
    </details>
  );
}
