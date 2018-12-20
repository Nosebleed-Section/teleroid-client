'use strict'

const store = require('../store')
const resetForms = () => {
  $('form').trigger('reset')
  $('.message').text('')
}

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

const signUpFailure = function (error) {
  $('#sign-up-message').text('Error on sign up')
  $('#sign-up-message').removeClass('success')
  $('#sign-up-message').addClass('failure')
  console.error('signUpFailure ran. Error is :', error)
}

const signInSuccess = function (data) {
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

const signInFailure = function (error) {
  $('#sign-in-message').text('Error on sign in')
  $('#sign-in-message').removeClass('success')
  $('#sign-in-message').addClass('failure')
  console.error('signInFailure ran. Error is :', error)
}

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
  store.user = null
}

const signOutFailure = function (error) {
  $('#sign-out-message').text('Error on sign out')
  $('#sign-out-message').removeClass('success')
  $('#sign-out-message').addClass('failure')
  console.error('signOutFailure ran. Error is :', error)
}

const changePasswordSuccess = function () {
  $('#change-password-message').text('Changed password successfully')
  $('#change-password-message').removeClass('failure')
  $('#change-password-message').addClass('success')
  setTimeout(function () {
    resetForms()
    $('#changePasswordModal').modal('hide')
  }, 3000)
}

const changePasswordFailure = function (error) {
  $('#change-password-message').text('Error on change password')
  $('#change-password-message').removeClass('success')
  $('#change-password-message').addClass('failure')
  console.error('changePasswordFailure ran. Error is :', error)
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
