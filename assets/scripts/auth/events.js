const api = require('./api.js')
const getFormFields = require('../../../lib/get-form-fields.js')
const ui = require('./ui.js')

///////////////////
//               //
//  AUTH Events  //
//               //
///////////////////

// onChangePassword() is called when the user changes their password;
// it sends form info the API
const onChangePassword = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}

// onSignIn() is called when the user submits the sign-in form;
// it sends the user's sign-in info to the API
const onSignIn = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

// onSignOut() is called when the user selects sign-out;
// it deletes the user's token and signs them out
const onSignOut = function (event) {
  event.preventDefault()
  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

// onSignUp() is called when the user submits the sign-up form;
// it sends the user's sign-up info to the API
const onSignUp = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signUp(data)
    .then(() => api.signIn(data))
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

module.exports = {
  onChangePassword,
  onSignIn,
  onSignOut,
  onSignUp
}
