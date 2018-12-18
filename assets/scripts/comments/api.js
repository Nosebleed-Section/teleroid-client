const config = require('./../config.js')
const store = require('../store.js')

const destroy = function (data) {
  return $.ajax({
    url: config.apiUrl + '/comments/' + data.comment.id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const update = function (data) {
  return $.ajax({
    url: config.apiUrl + '/comments/' + data.comment.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

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

const show = function (id) {
  console.log(config.apiUrl + '/comments/' + id)
  return $.ajax({
    url: config.apiUrl + '/comments/' + id,
    method: 'GET'
  })
}

module.exports = {
  destroy,
  update,
  create,
  show
}
