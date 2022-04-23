/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { unscapeCode } from '../../assets/utilFunctions';

export default function ReactMarkdownComponent(props) {
  const { md } = props;

  return (
    <ReactMarkdown
      components={{
        // eslint-disable-next-line react/no-unstable-nested-components
        code({
          node, inline, className, children, ...innerProps
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
            <code className={className} {...innerProps}>
              {children}
            </code>
          );
        },
      }}
    >
      {unscapeCode(md)}
    </ReactMarkdown>
  );
}
