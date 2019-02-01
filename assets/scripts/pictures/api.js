const store = require('../store.js')
const config = require('../config.js')

////////////////////////////
//                        //
//  PICTURES API actions  //
//                        //
////////////////////////////

// deletePicture() deletes a picture from the API
const deletePicture = (id) => {
  return $.ajax({
    url: config.apiUrl + '/pictures/' + id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

// getAllPictures() gets all the pictures from API
const getAllPictures = () => {
  return $.ajax({
    url: config.apiUrl + '/pictures',
    method: 'GET'
  })
}

// getOnePicture gets a single picture from API
const getOnePicture = (id) => {
  return $.ajax({
    url: config.apiUrl + '/pictures/' + id,
    method: 'GET'
  })
}

// sendFormData() sends form data to the API to create a new picture
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

// sendModifyFormData() sends form data to the API to patch an existing picture
const sendModifyFormData = data => {
  return $.ajax({
    url: config.apiUrl + '/pictures/' + data.get('id'),
    method: 'PATCH',
    processData: false,
    contentType: false,
    data,
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  deletePicture,
  sendFormData,
  getAllPictures,
  getOnePicture,
  sendModifyFormData
}
