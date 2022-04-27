/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';

import QuizComponent from '../support/QuizComponent';
import './DetailsSummary.scss';
import ReactMarkdownComponent from '../support/ReactMarkdownComponent';

export default function DetailsSummary(props) {
  const { str, errormd } = props;
  const [show, setShow] = React.useState(false);
  const [splitStr, setSplitStr] = React.useState([]);

  useEffect(() => {
    const localSplitStr = str.split(':');
    localSplitStr[4] = localSplitStr[4].substring(0, localSplitStr[4].indexOf(' ('));
    setSplitStr(localSplitStr);
  }, [str]);

  return (
    <details>
      <summary>
        {`At line ${splitStr[1]} character ${splitStr[2]}: ${splitStr[4]}`}
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
