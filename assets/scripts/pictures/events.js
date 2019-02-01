const api = require('./api.js')
const ui = require('./ui.js')
const store = require('../store')

///////////////////////
//                   //
//  PICTURES Events  //
//                   //
///////////////////////

// onDeletePicture() fires when the user deletes a picture
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

// onFormSubmit() fires when the user hits the submit button to create a new pic
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

// onGetAllPictures() retrieves all pictures from all users
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

// onGetAllUserPictures() retrieves all the current user's pictures from the API
// and displays them
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

// onModify FormSubmit() fires when the user hits the submit button to
// update an existing picture
const onModifyFormSubmit = (event) => {
  event.preventDefault()
  const updateForm = document.getElementById('edit-photo-form-data')
  const formData = new FormData(updateForm)
  for (const pair of formData.values()) {
    if (!(pair[0]) && !(pair[1])) {
      $('#edit-picture-message').text('Must update at least one field')
      return null
    }
  }
  formData.set('id', $('.single-pic-image').data('id'))
  api.sendModifyFormData(formData)
    .then(ui.onUpdateFormSubmitSuccess)
    .then(() => {
      if (store.view === 'user pics') {
        setTimeout(onGetAllUserPictures, 2000)
      } else {
        setTimeout(onGetAllPictures, 2000)
      }
    })
    .catch(ui.onUpdateFormSubmitFailure)
}

module.exports = {
  onDeletePicture,
  onFormSubmit,
  onGetAllPictures,
  onGetAllUserPictures,
  onModifyFormSubmit
}
