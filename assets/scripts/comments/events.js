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
      console.log('inside refreshOneImage')
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
  console.log('inside refreshImageContents')
  comments.forEach(comment => {
    api.show(comment)
      .then(comment => {
        $('#display-comments').append(`${comment.username}: <span class="comment-div" id="${comment._id}">${comment.content}</span>`)
        if (store.user) {
          if (store.user._id === comment.owner) {
            $('#display-comments').append(`<img class="comment-edit-pencil" src="../../public/images/pencil-edit-button-gray24.png" data-id="${comment._id}">`)
            $('#display-comments').append(`<img class="comment-close-button" src="../../public/images/close-x-gray24.png" data-id="${comment._id}">`)
            $('.comment-edit-pencil').on('click', onEditPencilClick)
            $('.comment-close-button').on('click', onDeleteCommentClick)
          }
        }
        $('#display-comments').append('<br />')
      })
      .catch(console.err)
  })
  $('#showPicModal').modal('show')
}

const onEditPencilClick = (event) => {
  console.log('in onEditPencilClick')
  const commentTarget = $(event.target).data('id')
  const commentText = $(`#${commentTarget}`).text()
  $(`#${commentTarget}`).html(`<form id="comment-input-${commentTarget}" class="comment-input"><input type="text" name="comment[content]" class="comment-input-text" value="${commentText}" required></form>`)
  $(`#comment-input-${commentTarget}`).on('submit', (event) => {
    event.preventDefault()
    console.log('event is', event)
    console.log('event.target is', event.target)
    const data = getFormFields(event.target)
    data.comment.id = commentTarget
    api.update(data)
      .then(() => {
        refreshOneImage($('.single-pic-image').data('id'))
      })
      .catch(console.error)
  })
}

module.exports = {
  onCreateComment,
  onUpdateComment,
  onDeleteCommentClick,
  onDeleteCommentSubmit
}
