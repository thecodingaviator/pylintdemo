/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';

import { Link } from 'react-router-dom';
import './DetailsSummary.scss';
import ReactMarkdownComponent from '../support/ReactMarkdownComponent';

export default function DetailsSummary(props) {
  const { str, errormd } = props;
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
        <div>
          <ReactMarkdownComponent md={errormd.md} />
          <Row className="mb-2">
            <Col sm={{ span: 2, offset: 10 }}>
              <Link to={`/quiz/${errormd.id}`} onClick={() => localStorage.setItem(`${errormd.id}`, JSON.stringify(errormd))} target="_blank" rel="noopener noreferrer">
                <button className="btn btn-primary w-100" type="button">
                  Quiz
                </button>
              </Link>
            </Col>
          </Row>
        </div>
      )}
    </details>
  );
}
