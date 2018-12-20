'use strict'

const api = require('./api.js')
const store = require('../store.js')
const commentApi = require('../comments/api.js')
const commentEvents = require('../comments/events.js')
const getFormFields = require('../../../lib/get-form-fields.js')

const allPicturesTemplate = require('../templates/pictures.handlebars')

const onGetAllPicturesSuccess = function (data) {
  const usablePics = data.pictures.filter(picture => {
    return picture.url
  })
  usablePics.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt)
  })
  store.view = 'all pics'
  store.pictures = usablePics
  store.picsPerPage = 12
  store.pageNums = Math.ceil(usablePics.length / store.picsPerPage)
}

const onGetAllUserPicturesSuccess = function (data) {
  const usablePics = data.pictures.filter(picture => {
    return (picture.url && picture.owner === store.user._id)
  })
  usablePics.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt)
  })
  store.view = 'user pics'
  store.pictures = usablePics
  store.picsPerPage = 12
  store.pageNums = Math.ceil(usablePics.length / store.picsPerPage)
}

const displayOneImage = (data) => {
  $('#display-comments').html('')
  $('#single-pic').html('')
  if (store.user) {
    if (store.user._id === data.picture.owner) {
      $('#single-pic').append(`<div class="edit-pencil"></div>`)
      $('#single-pic').append(`<div class="close-button"></div>`)
      $('.edit-pencil').on('click', () => {
        $('#showPicModal').modal('hide')
        $('#editPictureModal').modal('show')
      })
      $('.close-button').on('click', () => {
        $('#deletePictureConfirmModal').modal('show')
      })
    }
  }
  $('#single-pic').append(`<img class="single-pic-image" src=${data.picture.url} data-id=${data.picture._id}>`)
  $('#showPicModalLabel').text(`${data.picture.title}`)
  displayImageContents(data.picture.comments)
}

const displayImageContents = (comments) => {
  comments.sort((a, b) => {
    return new Date(a.createdAt) - new Date(b.createdAt)
  })
  comments.forEach(comment => {
    commentApi.show(comment)
      .then(comment => {
        $('#display-comments').append(`${comment.username}: <span class="comment-div" id="${comment._id}">${comment.content}</span>`)
        if (store.user) {
          if (store.user._id === comment.owner) {
            $('#display-comments').append(`<div class="comment-edit-pencil" data-id="${comment._id}"></div>`)
            $('#display-comments').append(`<div class="comment-close-button" data-id="${comment._id}"></div>`)
            $('.comment-edit-pencil').on('click', onEditPencilClick)
            $('.comment-close-button').on('click', commentEvents.onDeleteCommentClick)
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
    commentApi.update(data)
      .then(() => {
        api.getOnePicture($('.single-pic-image').data('id'))
          .then(displayOneImage)
          .catch((error) => {
            $('#display-comments').html(`<p class="failure">Error: could not refresh image</p>`)
          })
      })
  })
}

const displayPageOfPictures = (page) => {
  const i = page * store.picsPerPage
  const gridrow = [
    [store.pictures[i], store.pictures[i + 1], store.pictures[i + 2]],
    [store.pictures[i + 3], store.pictures[i + 4], store.pictures[i + 5]],
    [store.pictures[i + 6], store.pictures[i + 7], store.pictures[i + 8]],
    [store.pictures[i + 9], store.pictures[i + 10], store.pictures[i + 11]]
  ]
  const html = allPicturesTemplate({ gridrow: gridrow })
  let moreHtml = ''
  if (store.pageNums > 1) {
    moreHtml += `<div class="page-number-container">`
    for (let i = 0; i < store.pageNums; i++) {
      if (i !== page) {
        moreHtml += `<div class="page-number"><a href="#" data-id="${i}">${i + 1}</a></div>`
      } else {
        moreHtml += `<div>${i + 1}</div>`
      }
    }
    moreHtml += `</div>`
  }
  $('.div-of-divs').html('')
  $('.div-of-divs').html(html)
  $('.div-of-divs').append(moreHtml)
  $('.page-number').on('click', function (event) {
    event.preventDefault()
    displayPageOfPictures(parseInt($(event.target).data('id')))
  })
  $('.picture-preview-image').on('click', function (event) {
    event.preventDefault()
    api.getOnePicture($(event.target).data('id'))
      .then(displayOneImage)
  })
}

const onDeletePictureSuccess = () => {
  $('#comment-message').html('successfully deleted pic')
  setTimeout(function () {
    $('#showPicModal').modal('hide')
  }, 2000)
}

const onDeletePictureFailure = () => {
  $('#comment-message').html('failed to delete pic')
}

const onUploadFormSubmitSuccess = () => {
  $('#upload-message').html('successfully uploaded pic')
  setTimeout(function () {
    $('#uploadModal').modal('hide')
  }, 2000)
}

const onUploadFormSubmitFailure = (response) => {
  $('#upload-message').html('could not upload pic')
}

const onUpdateFormSubmitSuccess = () => {
  $('#upload-message').html('successfully updated pic')
  setTimeout(function () {
    $('#editPictureModal').modal('hide')
  }, 2000)
}

const onUpdateFormSubmitFailure = (response) => {
  $('#upload-message').html('could not update pic')
}

module.exports = {
  displayOneImage,
  displayPageOfPictures,
  onDeletePictureFailure,
  onDeletePictureSuccess,
  onGetAllPicturesSuccess,
  onGetAllUserPicturesSuccess,
  onUploadFormSubmitSuccess,
  onUploadFormSubmitFailure,
  onUpdateFormSubmitSuccess,
  onUpdateFormSubmitFailure
}
