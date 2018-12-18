'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

const authEvents = require('./auth/events.js')
const authUi = require('./auth/ui.js')
const picEvents = require('./pictures/events.js')
const commentEvents = require('./comments/events.js')

$(() => {
  picEvents.onGetAllPictures()
  $('#multipart-form-data').on('submit', picEvents.onFormSubmit)
  $('#sign-up').on('submit', authEvents.onSignUp)
  $('#change-password').on('submit', authEvents.onChangePassword)
  $('#sign-out').on('submit', authEvents.onSignOut)
  $('#sign-in').on('submit', authEvents.onSignIn)
  $('#create-comment').on('submit', commentEvents.onCreateComment)
  $('.modal').on('hide.bs.modal', authUi.resetForms)
  // Hide/show animation hamburger function
  $('.navbar-toggler').on('click', function () {
  // Take this line to first hamburger animations
    $('.animated-icon1').toggleClass('open')
  })
  $('#my-photos').on('click', picEvents.onGetAllUserPictures)
})
