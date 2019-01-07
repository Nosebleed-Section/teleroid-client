const api = require('./api.js')
const getFormFields = require('../../../lib/get-form-fields.js')
const ui = require('./ui.js')
const store = require('../store.js')

const onDeleteCommentClick = function (event) {
  event.preventDefault()
  store.deleteCommentId = $(event.target).data('id')
  $('#deleteCommentConfirmModal').modal('show')
}

const onDeleteCommentSubmit = function (event) {
  event.preventDefault()
  const data = store.deleteCommentId
  api.destroy(data)
    .then(() => refreshOneImage($('.single-pic-image').data('id')))
    .then(ui.onDeleteCommentSuccess)
    .catch(ui.onDeleteCommentError)
}

const onUpdateComment = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  if (data.comment.text === '') {
    $('#comment-message').html('<p>comment text is required</p>')
  } else if (data.comment.id === '') {
    $('#comment-message').html('<p>comment id required</p>')
  } else {
    api.update(data)
      .then(ui.onUpdateCommentSuccess)
      .catch(ui.onUpdateCommentError)
  }
}

const onCreateComment = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  data.comment.picture = $('.single-pic-image').data('id')
  if (data.comment.text === '') {
    $('#comment-message').html('<p>comment text is required</p>')
  } else {
    api.create(data)
      .then(() => refreshOneImage($('.single-pic-image').data('id')))
      .then(ui.onCreateCommentSuccess)
      .catch(ui.onCreateCommentError)
  }
}

const refreshOneImage = (data) => {
  api.getOnePicture(data)
    .then((data) => {
      $('#display-comments').html('')
      $('#showPicModalLabel').text(`${data.picture.title}`)
      $('#single-pic').html(`<img class="single-pic-image" src=${data.picture.url} data-id=${data.picture._id}>`)
      if (store.user) {
        if (store.user._id === data.picture.owner) {
          $('#single-pic').append(`<div class="edit-pencil"></div>`)
          $('#single-pic').append(`<div class="close-button">`)
          $('.edit-pencil').on('click', () => {
            $('#showPicModal').modal('hide')
            $('#editPictureModal').modal('show')
          })
          $('.close-button').on('click', () => {
            $('#deletePictureConfirmModal').modal('show')
          })
        }
      }
      return data
    })
    .then(data => setTimeout(() => refreshImageContents(data.picture.comments), 200))
    .catch(() => {
      $('#single-pic').html(`<p class="failure">Error: could not load image data</p>`)
    })
}

const refreshImageContents = (comments) => {
  comments.sort((a, b) => {
    return new Date(a.createdAt) - new Date(b.createdAt)
  })
  comments.forEach(comment => {
    api.show(comment)
      .then(comment => {
        $('#display-comments').append(`${comment.username}: <span class="comment-div" id="${comment._id}">${comment.content}</span>`)
        if (store.user) {
          if (store.user._id === comment.owner) {
            $('#display-comments').append(`<div class="comment-edit-pencil" data-id="${comment._id}"></div>`)
            $('#display-comments').append(`<div class="comment-close-button" data-id="${comment._id}"></div>`)
            $('.comment-edit-pencil').on('click', onEditPencilClick)
            $('.comment-close-button').on('click', onDeleteCommentClick)
          }
        }
        $('#display-comments').append('<br />')
      })
      .catch(() => {
        $('#display-comments').html(`<p class="failure">Error: could not load comment data</p>`)
      })
  })
  $('#showPicModal').modal('show')
}

const onEditPencilClick = (event) => {
  const commentTarget = $(event.target).data('id')
  const commentText = $(`#${commentTarget}`).text()
  $(`#${commentTarget}`).html(`<form id="comment-input-${commentTarget}" class="comment-input"><input type="text" name="comment[content]" class="comment-input-text" value="${commentText}" required></form>`)
  $(`#comment-input-${commentTarget}`).on('submit', (event) => {
    event.preventDefault()
    const data = getFormFields(event.target)
    data.comment.id = commentTarget
    api.update(data)
      .then(() => {
        refreshOneImage($('.single-pic-image').data('id'))
      })
      .catch(() => {
        $('#display-comments').html(`<p class="failure">Error: could not refresh image</p>`)
      })
  })
}

module.exports = {
  onCreateComment,
  onUpdateComment,
  onDeleteCommentClick,
  onDeleteCommentSubmit
}
