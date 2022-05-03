import React from 'react';
import { Row, Col } from 'react-bootstrap';
import './Footer.css';

export default function FooterComp() {
  const year = new Date().getFullYear();
  return (
    <div className="footer w-100 mt-5 mb-5 text-center">
      <Row>
        <Col md={{ span: 12 }}>
          Created by
          {' '}
          <a href="//parthparth.com" target="_blank" rel="noopener noreferrer">
            Parth Parth
          </a>
          {' '}
          &copy;
          {' '}
          {year}
        </Col>
      </Row>
    </div>
  );
}
