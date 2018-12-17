// const store = require('../store.js')
const api = require('./api.js')
const ui = require('./ui.js')

const onFormSubmit = (event) => {
  event.preventDefault()
  const uploadForm = document.getElementById('multipart-form-data')
  const formData = new FormData(uploadForm)
  api.sendFormData(formData)
    .then(console.log)
    .catch(console.error)
}

const onGetAllPictures = (event) => {
  api.getAllPictures()
    .then(ui.onGetAllPicturesSuccess)
    .then(() => { ui.displayPageOfPictures(0) })
    .catch(ui.onGetAllPicturesFailure)
}

module.exports = {
  onFormSubmit,
  onGetAllPictures
}
