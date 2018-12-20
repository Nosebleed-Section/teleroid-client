const api = require('./api.js')
const getFormFields = require('../../../lib/get-form-fields.js')
const ui = require('./ui.js')
const store = require('../store.js')

const onDeleteCommentClick = function (event) {
  console.log('in onDeleteCommentClick')
  event.preventDefault()
  console.log(event.target)
  console.log($(event.target).data('id'))
  store.deleteCommentId = $(event.target).data('id')
  $('#deleteCommentConfirmModal').modal('show')
}

const onDeleteCommentSubmit = function (event) {
  console.log('in onDeleteCommentSubmit')
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
      console.log('inside displayOneImage')
      $('#display-comments').html('')
      console.log('data is', data)
      $('#single-pic').html(`<img class="single-pic-image" src=${data.picture.url} data-id=${data.picture._id}>`)
      if (store.user) {
        if (store.user._id === data.picture.owner) {
          $('#single-pic').append(`<img class="edit-pencil" src="../../public/images/pencil-edit-button-gray24.png">`)
          $('#single-pic').append(`<img class="close-button" src="../../public/images/close-x-gray24.png">`)
          $('.edit-pencil').on('click', () => {
            console.log('insside edit pencil')
            $('#showPicModal').modal('hide')
            $('#editPictureModal').modal('show')
          })
          $('.close-button').on('click', () => {
            console.log('insssssside close button')
            $('#deletePictureConfirmModal').modal('show')
          })
        }
      }
      refreshImageContents(data.picture.comments)
    })
    .catch(console.error)
}

const refreshImageContents = (comments) => {
  comments.forEach(comment => {
    console.log('in forEach, comment is', comment)
    api.show(comment)
      .then(comment => {
        console.log('comment is', comment)
        $('#display-comments').append(`${comment.username}: ${comment.content}<br />`)
        if (store.user) {
          if (store.user._id === comment.owner) {
            console.log('comment._id is ', comment._id)
            $('#display-comments').append(`<img class="comment-edit-pencil" src="../../public/images/pencil-edit-button-gray24.png" data-id="${comment._id}">`)
            $('#display-comments').append(`<img class="comment-close-button" src="../../public/images/close-x-gray24.png" data-id="${comment._id}">`)
            $('.comment-edit-pencil').on('click', () => {
              console.log('insside edit pencil')
              $('#showPicModal').modal('hide')
              $('#editPictureModal').modal('show')
            })
            $('.comment-close-button').on('click', onDeleteCommentClick)
          }
        }
      })
      .catch(console.err)
  })
  $('#showPicModal').modal('show')
}

module.exports = {
  onCreateComment,
  onUpdateComment,
  onDeleteCommentClick,
  onDeleteCommentSubmit
}
