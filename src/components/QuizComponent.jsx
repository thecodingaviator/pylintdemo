/* eslint-disable react/prop-types */
import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { unscapeCode } from '../assets/utilFunctions';

import ReactMarkdownComponent from './ReactMarkdownComponent';

export default function QuizComponent(props) {
  const { errormd } = props;
  const quizmd = JSON.parse(errormd.quiz);

  const [disabled, setDisabled] = React.useState(false);

  function handleAnswerSubmit(e) {
    e.preventDefault();
    const { id } = e.target;
    const correct = id.substring(id.indexOf('-') + 1) === quizmd.answer;
    if (correct) {
      e.target.className = 'btn btn-success w-100';
      setDisabled(true);
    } else {
      e.target.className = 'btn btn-danger w-100';
    }
  }

  return (
    <div>
      <Row>
        <Col sm={{ span: 12 }}>
          <ReactMarkdownComponent md={unscapeCode(quizmd.title)} />
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 3 }} sm={{ span: 6 }}>
          <Button variant="primary" className="w-100" id="option-1" onClick={handleAnswerSubmit} disabled={disabled}>
            {quizmd.question[0]}
          </Button>
        </Col>
        <Col md={{ span: 3 }} sm={{ span: 6 }}>
          <Button variant="primary" className="w-100" id="option-2" onClick={handleAnswerSubmit} disabled={disabled}>
            {quizmd.question[1]}
          </Button>
        </Col>
        <Col md={{ span: 3 }} sm={{ span: 6 }}>
          <Button variant="primary" className="w-100" id="option-3" onClick={handleAnswerSubmit} disabled={disabled}>
            {quizmd.question[2]}
          </Button>
        </Col>
        <Col md={{ span: 3 }} sm={{ span: 6 }}>
          <Button variant="primary" className="w-100" id="option-4" onClick={handleAnswerSubmit} disabled={disabled}>
            {quizmd.question[3]}
          </Button>
        </Col>
      </Row>
    </div>
  );
}
