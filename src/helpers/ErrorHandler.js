export const handleErrors = error => {
  const {
    data: { message }
  } = error.response
  if (message) {
    throw new Error(message)
  } else {
    throw new Error('Oops!')
  }
}
