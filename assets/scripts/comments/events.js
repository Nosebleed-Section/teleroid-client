const api = require('./api.js')
const getFormFields = require('../../../lib/get-form-fields.js')
const ui = require('./ui.js')
const store = require('../store.js')

///////////////////////
//                   //
//  COMMENTS Events  //
//                   //
///////////////////////

// onCreateComment() fires when the user submits a new comment;
// it passes form data to the API call
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

// onDeleteCommentClick() pops a confirmation modal if the user clicks on the
// delete button for a comment
const onDeleteCommentClick = function (event) {
  event.preventDefault()
  store.deleteCommentId = $(event.target).data('id')
  $('#deleteCommentConfirmModal').modal('show')
}

// onDeleteCommentSubmit() fires if the user hits confirm on the delete
// confirmation modal--it sends a delete request to the API
const onDeleteCommentSubmit = function (event) {
  event.preventDefault()
  const data = store.deleteCommentId
  api.destroy(data)
    .then(() => refreshOneImage($('.single-pic-image').data('id')))
    .then(ui.onDeleteCommentSuccess)
    .catch(ui.onDeleteCommentError)
}

// onEditPencilClick() fires when the edit pencil next to a comment is clicked;
// it turns the comment text into a form and lets the user update it
// this function duplicates onEditPencilClick() in pictures/ui.js and is here
// to avoid a circular dependency issue
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

// refreshImageContents() duplicates the same function as displayImageContents() in
// picture/ui.js; it's here to avoid a circular dependency issue;
// its job is to refresh the comments list if the user changes a comment
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

// refreshOneImage() duplicates the same function as displayOneImage() in
// picture/ui.js; it's here to avoid a circular dependency issue;
// its job is to refresh the current image if the user changes a comment
const refreshOneImage = (data) => {
  api.getOnePicture(data)
    .then((data) => {
      $('#display-comments').html('')
      $('#showPicModalLabel').text(`${data.picture.title}`)
      $('#single-pic').html(`<img class="single-pic-image" src=${data.picture.url} data-id=${data.picture._id}>`)
      if (store.user) {
        // checking to see if this picture belongs to current user;
        // if so, add edit/delete buttons
        if (store.user._id === data.picture.owner) {
          // adding an edit button
          $('#single-pic').append(`<div class="edit-pencil"></div>`)
          // adding a delete button
          $('#single-pic').append(`<div class="close-button">`)
          // attaching event listener to edit button
          $('.edit-pencil').on('click', () => {
            $('#showPicModal').modal('hide')
            $('#editPictureModal').modal('show')
          })
          // attaching event listener to delete button
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

module.exports = {
  onCreateComment,
  onDeleteCommentClick,
  onDeleteCommentSubmit
}
