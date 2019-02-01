const onCreateCommentFailure = (response) => {
  $('#comment-message').html('something went wrong, try again.')
}

const onCreateCommentSuccess = () => {
  $('#comment-message').html('you added a comment')
  $('#create-comment').trigger('reset')
}

const onDeleteCommentFailure = (response) => {
  $('#comment-message').html('something went wrong, try again.')
}

const onDeleteCommentSuccess = () => {
  $('#comment-message').html('comment successfully destroyed')
}

const onUpdateCommentFailure = (response) => {
  $('#comment-message').html('something went wrong, try again.')
}

const onUpdateCommentSuccess = (response) => {
  $('#content').html('you successfully changed  the comment')
  $('#update-comment').trigger('reset')
}

module.exports = {
  onCreateCommentFailure,
  onCreateCommentSuccess,
  onDeleteCommentFailure,
  onDeleteCommentSuccess,
  onUpdateCommentFailure,
  onUpdateCommentSuccess
}
