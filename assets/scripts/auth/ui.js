'use strict'

const store = require('../store')

///////////////
//           //
//  AUTH UI  //
//           //
///////////////

// changePasswordFailure() tells the user that change password failed
const changePasswordFailure = function () {
  $('#change-password-message').text('Error on change password')
  $('#change-password-message').removeClass('success')
  $('#change-password-message').addClass('failure')
}

// changePasswordSuccess() confirms to the user that change password was
// succesful
const changePasswordSuccess = function () {
  $('#change-password-message').text('Changed password successfully')
  $('#change-password-message').removeClass('failure')
  $('#change-password-message').addClass('success')
  setTimeout(function () {
    resetForms()
    $('#changePasswordModal').modal('hide')
  }, 3000)
}

// resetForms() clears all the input on the various auth forms
const resetForms = () => {
  $('form').trigger('reset')
  $('.message').text('')
}

// signUpFailure() tells the user that sign up failed
const signUpFailure = function () {
  $('#sign-up-message').text('Error on sign up')
  $('#sign-up-message').removeClass('success')
  $('#sign-up-message').addClass('failure')
}

// signUpSuccess() tells the user that sign up was successful
const signUpSuccess = function (data) {
  $('#sign-up-message').text('Signed up successfully')
  $('#sign-up-message').removeClass('failure')
  $('#sign-up-message').addClass('success')
  $('.startButtons').addClass('d-none')
  $('.signedInButtons').removeClass('d-none')
  setTimeout(function () {
    resetForms()
    $('#signUpModal').modal('hide')
  }, 2000)
  store.user = data.user
}

// signInFailure() tells the user that they failed to sign in
const signInFailure = function () {
  $('#sign-in-message').text('Error on sign in')
  $('#sign-in-message').removeClass('success')
  $('#sign-in-message').addClass('failure')
}

// signInSuccess() tells the user that they signed in successfully
const signInSuccess = function (data) {
  $('#my-photos').removeClass('d-none')
  $('#sign-in-message').text('Signed in successfully')
  $('#sign-in-message').removeClass('failure')
  $('#sign-in-message').addClass('success')
  $('.startButtons').addClass('d-none')
  $('.signedInButtons').removeClass('d-none')
  setTimeout(function () {
    resetForms()
    $('#signInModal').modal('hide')
  }, 2000)
  store.user = data.user
}

// signOutFailure() tells the user they failed to sign out
const signOutFailure = function () {
  $('#sign-out-message').text('Error on sign out')
  $('#sign-out-message').removeClass('success')
  $('#sign-out-message').addClass('failure')
}

// signOutSuccess() tells the user that they signed succesfully
const signOutSuccess = function () {
  $('#sign-out-message').text('Signed out successfully')
  $('#sign-out-message').removeClass('failure')
  $('#sign-out-message').addClass('success')
  setTimeout(function () {
    resetForms()
    $('#signOutModal').modal('hide')
  }, 2000)
  $('.startButtons').removeClass('d-none')
  $('.signedInButtons').addClass('d-none')
  $('#my-photos').addClass('d-none')
  $('#all-photos').addClass('d-none')
  store.user = null
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  changePasswordSuccess,
  changePasswordFailure,
  resetForms
}
