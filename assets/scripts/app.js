'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

const events = require('./auth/events.js')

$(() => {
  $('#multipart-form-data').on('submit', events.onFormSubmit)
  $('#sign-up').on('submit', events.onSignUp)
  $('#sign-in').on('submit', events.onSignIn)
  // Hide/show animation hamburger function
  $('.navbar-toggler').on('click', function () {
  // Take this line to first hamburger animations
    $('.animated-icon1').toggleClass('open')
  })
})
