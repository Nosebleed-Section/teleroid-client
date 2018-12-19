'use strict'

const api = require('./api.js')
const store = require('../store.js')
const commentApi = require('../comments/api.js')

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
  console.log('data is', data)
  $('#single-pic').html(`<img class="single-pic-image" src=${data.picture.url} data-id=${data.picture._id}>`)
  if (store.user._id === data.picture.owner) {
     $('#single-pic').append(`<img class="edit-pencil" src="../../public/images/pencil-edit-button-gray24.png">`)
     $('.edit-pencil').on("click", ()=> {
       console.log('insside edit pencil')
       $('#showPicModal').modal('hide')
       $('#editPictureModal').modal('show')
     })
  }
  data.picture.comments.forEach(comment => {
    console.log('in forEach, comment is', comment)
    commentApi.show(comment)
      .then(comment => {
        console.log('comment is', comment)
        $('#display-comments').append(`${comment.username}: ${comment.content}<br />`)
      })
      .catch(console.err)
  })
  $('#showPicModal').modal('show')
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

const onUploadFormSubmitSuccess = () => {
  $('#upload-message').html('successfully uploaded pic')
  console.log('successfully uploaded a pic')
  setTimeout(function () {
    $('#uploadModal').modal('hide')
  }, 2000)
}

const onUploadFormSubmitFailure = (response) => {
  console.error(response)
  $('#upload-message').html('could not upload pic')
}

const onUpdateFormSubmitSuccess = () => {
  $('#upload-message').html('successfully updated pic')
  console.log('successfully updated a pic')
  setTimeout(function () {
    $('#editPictureModal').modal('hide')
  }, 2000)
}

const onUpdateFormSubmitFailure = (response) => {
  console.error(response)
  $('#upload-message').html('could not update pic')
}

module.exports = {
  displayOneImage,
  displayPageOfPictures,
  onGetAllPicturesSuccess,
  onGetAllUserPicturesSuccess,
  onUploadFormSubmitSuccess,
  onUploadFormSubmitFailure,
  onUpdateFormSubmitSuccess,
  onUpdateFormSubmitFailure,
  displayOneImage
}
