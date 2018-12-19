const store = require('../store.js')
const config = require('../config.js')
// const authEvents = require('./events.js')

const sendFormData = data => {
  return $.ajax({
    url: config.apiUrl + '/pictures',
    method: 'POST',
    processData: false,
    contentType: false,
    data,
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const sendModifyFormData = data => {
  return $.ajax({
    url: config.apiUrl + '/pictures/' + id,
    method: 'PATCH',
    processData: false,
    contentType: false,
    data,
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const getAllPictures = () => {
  return $.ajax({
    url: config.apiUrl + '/pictures',
    method: 'GET'
  })
}

const getOnePicture = (id) => {
  return $.ajax({
    url: config.apiUrl + '/pictures/' + id,
    method: 'GET'
  })
}

const deletePicture = (id) => {
  return $.ajax({
    url: config.apiUrl + '/pictures/' + id,
    method: ''
  })
}

module.exports = {
  sendFormData,
  getAllPictures,
  getOnePicture,
  sendModifyFormData
}
