export function escapeCode(codeIn) {
  let code = codeIn;
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
  return code;
}

export function unscapeCode(codeIn) {
  let code = codeIn;
  /* Unescape all backslashes in code */
  code = code.replace(/\\\\/g, '\\');
  /* Unescape all quotes in code */
  code = code.replace(/\\'/g, "'");
  code = code.replace(/\\"/g, '"');
  /* Unescape all newlines in code */
  code = code.replace(/\\n/g, '\n');
  /* Unescape all tabs in code */
  code = code.replace(/\\t/g, '\t');
  /* Unescape all carriage returns in code */
  code = code.replace(/\\r/g, '\r');
  /* Unescape all linefeeds in code */
  code = code.replace(/\\f/g, '\f');
  return code;
}
