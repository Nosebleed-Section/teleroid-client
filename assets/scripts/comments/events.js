const api = require('./api.js')
const getFormFields = require('../../../lib/get-form-fields.js')
const ui = require('./ui.js')
const store = require('../store.js')

const onDeleteCommentClick = function (event) {
  event.preventDefault()
  $('#deleteCommentConfirmModal').modal('show')
}

const onDeleteCommentSubmit = function (event) {
  event.preventDefault()
  const data = $(event.target).data('id')
  api.destroy(data)
    .then(ui.onDestroyCommentSuccess)
    .catch(ui.onDestroyCommentError)
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
      .then(ui.onCreateCommentSuccess)
      .catch(ui.onCreateCommentError)
  }
}

module.exports = {
  onCreateComment,
  onUpdateComment,
  onDeleteCommentClick,
  onDeleteCommentSubmit
}
