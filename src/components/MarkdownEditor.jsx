/* eslint-disable */
import React, { useState } from 'react';

import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { Row, Col } from 'react-bootstrap';

import CodeMirror from '@uiw/react-codemirror';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { oneDark } from '@codemirror/theme-one-dark';

export default function MarkdownEditor() {
  const [userCode, setUserCode] = useState('# This is a title\n\nThis is a paragraph\n\n## This is heading 2\n\n```python\nprint(\'This is python\')\n```');

  function handleChange(newValue) {
    setUserCode(newValue);
  }

  return (
    <Row>
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
            code({
              node, inline, className, children, ...props
            }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, '')}
                  style={tomorrow}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                />
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
  );
}
