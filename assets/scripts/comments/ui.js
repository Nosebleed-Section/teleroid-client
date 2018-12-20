const onDeleteCommentSuccess = () => {
  $('#comment-message').html('comment successfully destroyed')
}

const onDeleteCommentFailure = (response) => {
  console.error(response)
  $('#comment-message').html('something went wrong, try again.')
}

const onUpdateCommentSuccess = (response) => {
  $('#content').html('you successfully changed  the comment')
  $('#update-comment').trigger('reset')
}

const onUpdateCommentFailure = (response) => {
  console.error(response)
  $('#comment-message').html('something went wrong, try again.')
}

const onCreateCommentSuccess = () => {
  $('#comment-message').html('you added a comment')
  $('#create-comment').trigger('reset')
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
