// const store = require('../store.js')
const api = require('./api.js')
const ui = require('./ui.js')
const store = require('../store')

const onFormSubmit = (event) => {
  event.preventDefault()
  const uploadForm = document.getElementById('multipart-form-data')
  const formData = new FormData(uploadForm)
  api.sendFormData(formData)
    .then(ui.onUploadFormSubmitSuccess)
    .then(() => {
      if (store.view === 'user pics') {
        onGetAllUserPictures()
      } else {
        onGetAllPictures()
      }
    })
    .catch(ui.onUploadFormSubmitFailure)
}

const onModifyFormSubmit = (event) => {
  event.preventDefault()
  const updateForm = document.getElementById('edit-photo-form-data')
  const formData = new FormData(updateForm)
  formData.set('id', $('.single-pic-image').data('id'))
  api.sendModifyFormData(formData)
    .then(ui.onUpdateFormSubmitSuccess)
    .then(() => {
      if (store.view === 'user pics') {
        onGetAllUserPictures()
      } else {
        onGetAllPictures()
      }
    })
    .catch(ui.onUpdateFormSubmitFailure)
}

const onGetAllPictures = (event) => {
  if (store.user) {
    $('#my-photos').removeClass('d-none')
    $('#all-photos').addClass('d-none')
  }
  api.getAllPictures()
    .then(ui.onGetAllPicturesSuccess)
    .then(() => { ui.displayPageOfPictures(0) })
    .catch(ui.onGetAllPicturesFailure)
}

const onGetAllUserPictures = (event) => {
  if (store.user) {
    $('#my-photos').addClass('d-none')
    $('#all-photos').removeClass('d-none')
  }
  api.getAllPictures()
    .then(ui.onGetAllUserPicturesSuccess)
    .then(() => { ui.displayPageOfPictures(0) })
    .catch(ui.onGetAllUserPicturesFailure)
}

const onDeletePicture = (event) => {
  api.deletePicture($('.single-pic-image').data('id'))
    .then(ui.onDeletePictureSuccess)
    .then(() => {
      if (store.view === 'user pics') {
        onGetAllUserPictures()
      } else {
        onGetAllPictures()
      }
    })
    .catch(ui.onDeletePictureFailure)
}

module.exports = {
  onFormSubmit,
  onGetAllPictures,
  onGetAllUserPictures,
  onModifyFormSubmit,
  onDeletePicture
}
