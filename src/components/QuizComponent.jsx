/* eslint-disable react/prop-types */
import React from 'react';

import { Row, Col } from 'react-bootstrap';

export default function QuizComponent(props) {
  const { errormd } = props;
  const quizmd = JSON.parse(errormd.quiz);

  return (
    <div>
      <Row>
        <Col sm={{ span: 12 }}>
          <h1>
            {quizmd.title}
          </h1>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 3 }} sm={{ span: 6 }}>
          <h3>
            {quizmd.question[0]}
          </h3>
        </Col>
        <Col md={{ span: 3 }} sm={{ span: 6 }}>
          <h3>
            {quizmd.question[0]}
          </h3>
        </Col>
        <Col md={{ span: 3 }} sm={{ span: 6 }}>
          <h3>
            {quizmd.question[0]}
          </h3>
        </Col>
        <Col md={{ span: 3 }} sm={{ span: 6 }}>
          <h3>
            {quizmd.question[0]}
          </h3>
        </Col>
      </Row>
    </div>
  );
}
