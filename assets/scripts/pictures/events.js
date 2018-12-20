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
  if (formData.title === '' && formData.image === undefined) {
    $('#edit-pic-message').html('please add image or title')
  } else {
    api.sendModifyFormData(formData)
      .then(ui.onUpdateFormSubmitSuccess)
      .catch(ui.onUpdateFormSubmitFailure)
  }
}

const onGetAllPictures = (event) => {
  api.getAllPictures()
    .then(ui.onGetAllPicturesSuccess)
    .then(() => { ui.displayPageOfPictures(0) })
    .catch(ui.onGetAllPicturesFailure)
}

const onGetAllUserPictures = (event) => {
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
