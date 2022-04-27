import React from 'react';
import { Container } from 'react-bootstrap';
import { Link, useSearchParams } from 'react-router-dom';
import LineGraph from '../support/LineGraph';

export default function UserData() {
  const [searchParams] = useSearchParams();

  return (
    <Container>
      <h1 className="mt-5 mb-3">User Data</h1>
      <div className="mb-5">
        <LineGraph id={searchParams.get('userID')} />
      </div>
      <Link to="/">
        <button className="btn btn-primary w-100 mb-5" type="button">
          Click here to go back
        </button>
      </Link>
    </Container>
  );
}
