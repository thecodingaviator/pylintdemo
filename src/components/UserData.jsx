import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function UserData() {
  const [searchParams] = useSearchParams();
  const [userScores, setUserScores] = useState(null);
  const { getScores } = useAuth();

  useEffect(() => {
    const userID = searchParams.get('userID');
    getScores(userID).then((res) => {
      let scores = res.score;
      scores = scores.split(',');
      scores = scores.map((score) => (
        <p>
          {parseInt(score, 10)}
        </p>
      ));
      setUserScores(scores);
    });
  }, [getScores, searchParams]);

  return (
    <Container>
      <h1>User Data</h1>
      <div>{userScores}</div>
      <Link to="/">
        <button className="btn btn-primary w-100" type="button">
          Click here to go back
        </button>
      </Link>
    </Container>
  );
}
