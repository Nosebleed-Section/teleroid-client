'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

const authEvents = require('./auth/events.js')
const picEvents = require('./pictures/events.js')

$(() => {
  $('#multipart-form-data').on('submit', picEvents.onFormSubmit)
  $('#sign-up').on('submit', authEvents.onSignUp)
  $('#sign-in').on('submit', authEvents.onSignIn)
  // Hide/show animation hamburger function
  $('.navbar-toggler').on('click', function () {
  // Take this line to first hamburger animations
    $('.animated-icon1').toggleClass('open')
  })
})
