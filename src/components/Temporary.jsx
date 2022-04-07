import React, { useEffect } from 'react';
import errorCodeArray from '../assets/errorCodeArray';
import { useAuth } from '../contexts/AuthContext';

export default function Temporary() {
  const { addErrorMarkdown } = useAuth();

  useEffect(() => {
    const code = '# This is a title\n\n### This is a stub. Add content\n\nThis is a paragraph\n\n## This is heading 2\n\n```python\nprint(\'This is python\')\n```';
    errorCodeArray.forEach((errorCode) => {
      addErrorMarkdown(errorCode, code);
    });
  }, []);

  return (
    <h1>
      Hi
    </h1>
  );
}
