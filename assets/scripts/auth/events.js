const store = require('../store.js')
const api = require('./api.js')
const getFormFields = require('../../../lib/get-form-fields.js')

// const onFormSubmit = (event) => {
//   event.preventDefault()
//   const uploadForm = document.getElementById('multipart-form-data')
//   const formData = new FormData(uploadForm)
//   api.sendFormData(formData)
//     .then(console.log)
//     .catch(console.error)
// }

const onSignUp = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signUp(data)
    .then(signUpSuccess)
    .catch(console.error)
}

const onSignIn = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signIn(data)
    .then(signInSuccess)
    .catch(console.error)
}

const signUpSuccess = (data) => {
  console.log('Sign up successful! data is', data)
  // close modal on sign up success
  $('#signUpModal').modal('hide')
}

const signInSuccess = (data) => {
  store.user = data.user
  console.log('Sign in successful! data.user is', data.user)
  // close modal on sign in success
  $('#signInModal').modal('hide')
}

module.exports = {
  onSignIn,
  onSignUp
}
