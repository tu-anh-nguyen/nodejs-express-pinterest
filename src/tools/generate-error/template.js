module.exports = (
  errors
) => `//DO NOT EDIT: code generated from 'tools/gen-err-code.go'
const errNameToAppError = {
${errors
  .map(
    ([name, code, httpCode, message]) =>
      `  ${name}: {
    statusCode: ${httpCode},
    code: ${code},
    message: '${message}',
  }`
  )
  .join(',\n')}
}

module.exports = errNameToAppError;
`;
