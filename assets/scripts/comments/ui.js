const picApi = require('./../pictures/api.js')
const picUi = require('./../pictures/ui.js')

const onDeleteCommentSuccess = () => {
  $('#comment-message').html('comment successfully destroyed')
  $('#delete-comment').trigger('reset')
  picApi.getOnePicture($('.single-pic-image').data('id'))
    .then(picUi.displayOneImage)
}

const onDeleteCommentFailure = (response) => {
  console.error(response)
  $('#comment-message').html('something went wrong, try again.')
}

const onUpdateCommentSuccess = (response) => {
  $('#content').html('you successfully changed  the comment')
  $('#update-comment').trigger('reset')
  picApi.getOnePicture($('.single-pic-image').data('id'))
    .then(picUi.displayOneImage)
}

const onUpdateCommentFailure = (response) => {
  console.error(response)
  $('#comment-message').html('something went wrong, try again.')
}

const onCreateCommentSuccess = () => {
  $('#comment-message').html('you added a comment')
  picApi.getOnePicture($('.single-pic-image').data('id'))
    .then(picUi.displayOneImage)
  // $('#create-comment').trigger('reset')
}

const onCreateCommentFailure = (response) => {
  console.error(response)
  $('#comment-message').html('something went wrong, try again.')
}

module.exports = {
  onCreateCommentSuccess,
  onCreateCommentFailure,
  onUpdateCommentSuccess,
  onUpdateCommentFailure,
  onDeleteCommentSuccess,
  onDeleteCommentFailure
}
