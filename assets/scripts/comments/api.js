const config = require('./../config.js')
const store = require('../store.js')

////////////////////////////
//                        //
//  COMMENTS API actions  //
//                        //
////////////////////////////

// create() creates a comment on the API
const create = function (data) {
  return $.ajax({
    url: config.apiUrl + '/comments',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

// destroy() deletes a comment on the API
const destroy = function (data) {
  return $.ajax({
    url: config.apiUrl + '/comments/' + data,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

// getOnePicture() retrieves a single picture from the API
// this function also appears in the pictures/api.js b/c comments need to
// refresh the current picture when they're deleted or created, and there was
// no way to call it in the other file without creating a circular dependency
const getOnePicture = (id) => {
  return $.ajax({
    url: config.apiUrl + '/pictures/' + id,
    method: 'GET'
  })
}

// show() gets a single comment from the API
const show = function (id) {
  return $.ajax({
    url: config.apiUrl + '/comments/' + id,
    method: 'GET',
    async: false // synchronous to avoid some display issues
  })
}

// update() patches a comment on the API
const update = function (data) {
  return $.ajax({
    url: config.apiUrl + '/comments/' + data.comment.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    async: false,
    data
  })
}

module.exports = {
  getOnePicture,
  destroy,
  update,
  create,
  show
}
