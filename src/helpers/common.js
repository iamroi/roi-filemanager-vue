import isString from 'lodash/isString'
import has from 'lodash/has'

export function getErrorFromResponse (err, defaultMsg = '') {
  let errMessage = defaultMsg
  // // let errMessage = "Sorry, we couldn't delete some files. Please try again later.";
  // errMessage = has(err, 'response.data.error.message') ? err.response.data.error.message : errMessage;
  // errMessage = has(err, 'response.data.message') ? err.response.data.message : errMessage;
  // errMessage = Array.isArray(errMessage) ? errMessage[0] : errMessage;

  let errMessages = getErrorsFromResponse(err)
  // console.log('wegweg weg weg')
  errMessage = errMessages.length ? errMessages[0] : errMessage

  return errMessage
}

export function getErrorsFromResponse (response) { //, defaultMsg = ''
  // let errMessage = defaultMsg;

  response = response.response ? response.response : response
  response = response.data ? response.data : response
  console.log(response)

  // order by least to best
  let error = isString(response) ? response : '' // response;
  error = has(response, 'exception') ? response.exception : error
  error = has(response, 'message') ? response.message : error
  error = has(response, 'error') ? response.error : error
  error = has(response, 'error.message') ? response.error.message : error

  let errMessages = Array.isArray(error)
    ? error
    : isString(error)
      ? [error]
      : []

  let errorsFields = typeof error === 'object' ? error : {}
  Object.entries(errorsFields).forEach(([fieldName, fieldErrors]) => {
    fieldErrors = Array.isArray(fieldErrors) ? fieldErrors : [fieldErrors]
    fieldErrors.forEach((fieldError, key) => {
      // console.log(`${key} ${fieldError}`); // "a 5", "b 7", "c 9"
      errMessages.push(fieldError)
    })
  })

  // console.log(errMessages)
  return errMessages
}
