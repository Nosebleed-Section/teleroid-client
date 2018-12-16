// const store = require('../store.js')
const api = require('./api.js')

const onFormSubmit = (event) => {
  event.preventDefault()
  const uploadForm = document.getElementById('multipart-form-data')
  const formData = new FormData(uploadForm)
  api.sendFormData(formData)
    .then(console.log)
    .catch(console.error)
}

module.exports = {
  onFormSubmit
}
