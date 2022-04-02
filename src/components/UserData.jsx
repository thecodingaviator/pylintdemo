import React from 'react';
import { Container } from 'react-bootstrap';
import { Link, useSearchParams } from 'react-router-dom';

import ScatterPlot from './ScatterPlot';

export default function UserData() {
  const [searchParams] = useSearchParams();

  return (
    <Container>
      <h1>User Data</h1>
      <div>
        <ScatterPlot id={searchParams.get('userID')} />
      </div>
      <Link to="/">
        <button className="btn btn-primary w-100" type="button">
          Click here to go back
        </button>
      </Link>
    </Container>
  );
}
