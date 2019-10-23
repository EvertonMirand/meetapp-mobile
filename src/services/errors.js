export function generateErrorMessage(err) {
  const { error } = err.response.data;
  return error && !error.message ? error : 'Ocorreu um erro desconhecido!';
}
