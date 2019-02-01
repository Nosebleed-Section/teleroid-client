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

  // Hide/show animation hamburger function
  $('.navbar-toggler').on('click', function () {
    $('.animated-icon1').toggleClass('open')
  })

  // AUTH
  $('#change-password').on('submit', authEvents.onChangePassword)
  $('#sign-in').on('submit', authEvents.onSignIn)
  $('#sign-out').on('submit', authEvents.onSignOut)
  $('#sign-up').on('submit', authEvents.onSignUp)
  $('.modal').on('hide.bs.modal', authUi.resetForms)

  // COMMENTS
  $('#create-comment').on('submit', commentEvents.onCreateComment)
  $('#delete-comment-submit').on('click', commentEvents.onDeleteCommentSubmit)

  // PICTURES
  $('#all-photos').on('click', picEvents.onGetAllPictures)
  $('#delete-picture-submit').on('click', picEvents.onDeletePicture)
  $('#edit-photo-form-data').on('submit', picEvents.onModifyFormSubmit)
  $('#multipart-form-data').on('submit', picEvents.onFormSubmit)
  $('#my-photos').on('click', picEvents.onGetAllUserPictures)
})
