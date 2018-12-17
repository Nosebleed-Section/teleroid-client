const config = require('./../config.js')

const destroy = function (data) {
  return $.ajax({
    url: config.apiUrl + '/comments/' + data.comment.id,
    method: 'DELETE'
  })
}

const update = function (data) {
  return $.ajax({
    url: config.apiUrl + '/comments/' + data.comment.id,
    method: 'PATCH',
    data
  })
}

const create = function (data) {
  return $.ajax({
    url: config.apiUrl + '/comments',
    method: 'POST',
    data
  })
}

module.exports = {
  destroy,
  update,
  create
}
