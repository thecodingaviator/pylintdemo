/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';

import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

import {
  Row, Col, Button, Alert,
} from 'react-bootstrap';

import CodeMirror from '@uiw/react-codemirror';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { oneDark } from '@codemirror/theme-one-dark';

import { Navigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';

import errorCodeArray from '../assets/errorCodeArray';

import './MarkdownEditor.scss';

export default function MarkdownEditor() {
  const [userCode, setUserCode] = useState('# This is a title\n\nThis is a paragraph\n\n## This is heading 2\n\n```python\nprint(\'This is python\')\n```');
  const {
    getErrorMarkdown, addErrorMarkdown, getAdmins, currentUID,
  } = useAuth();
  const [errorCode, setErrorCode] = useState('C0114');
  const [inProgress, setInProgress] = useState(false);
  const [error, setError] = useState(undefined);

  function handleChange(newValue) {
    setUserCode(newValue);
  }

  function handleErrorChange(event) {
    setErrorCode(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setInProgress(true);

    let code = userCode;
    /* Escape all backslashes in code */
    code = code.replace(/\\/g, '\\\\');
    /* Escape all quotes in code */
    code = code.replace(/'/g, "\\'");
    code = code.replace(/"/g, '\\"');
    /* Escape all newlines in code */
    code = code.replace(/\n/g, '\\n');
    /* Escape all tabs in code */
    code = code.replace(/\t/g, '\\t');
    /* Escape all carriage returns in code */
    code = code.replace(/\r/g, '\\r');
    /* Escape all linefeeds in code */
    code = code.replace(/\f/g, '\\f');

    try {
      addErrorMarkdown(errorCode, code);
    } catch (err) {
      setError(err);
    }

    setInProgress(false);
  }

  useEffect(() => {
    getAdmins().then((resOuter) => {
      const { list } = resOuter;

      if (!list.includes(currentUID)) {
        return (
          <Navigate to="/login" />
        );
      }

      getErrorMarkdown(errorCode).then((res) => {
        if (res) {
          setUserCode(res.md
            .replace(/\\n/g, '\n')
            .replace(/\\t/g, '\t')
            .replace(/\\r/g, '\r')
            .replace(/\\"/g, '"')
            .replace(/\\'/g, "'"));
        } else {
          setUserCode('# Need to create a new error code file for this error');
        }
      });
    });
  }, [errorCode]);

  return (
    <>
      <Row className="mt-5">
        <Col md={{ span: 6 }}>
          <h1>
            Error Code Markdown editing
          </h1>
        </Col>
        <Col md={{ span: 6 }} className="d-flex justify-content-evenly align-items-center">
          <select value={errorCode} onChange={handleErrorChange} className="dropdown-nav-option">
            {errorCodeArray.map((errorCodeArrayCode) => (
              <option key={errorCodeArrayCode} value={errorCodeArrayCode}>
                {errorCodeArrayCode}
              </option>
            ))}
          </select>
          <Button variant="primary" type="submit" className="dropdown-nav-option" onClick={handleSubmit} disabled={inProgress}>
            Save
          </Button>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 12 }}>
          {error && <Alert variant="danger">{error}</Alert>}
        </Col>
      </Row>
      <Row className="mt-5 mb-5">
        <Col md={{ span: 6 }}>
          <CodeMirror
            value={userCode}
            theme={oneDark}
            onChange={handleChange}
            height="90vh"
            extensions={[markdown({
              base: markdownLanguage,
              codeLanguages: languages,
            })]}
          />
        </Col>
        <Col md={{ span: 6 }}>
          <ReactMarkdown
            components={{
              // eslint-disable-next-line react/no-unstable-nested-components
              code({
                node, inline, className, children, ...props
              }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={tomorrow}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {userCode}
          </ReactMarkdown>
        </Col>
      </Row>
    </>
  );
}
