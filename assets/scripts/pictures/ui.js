'use strict'

const allPicturesTemplate = require('../templates/pictures.handlebars')

const onGetAllPicturesSuccess = function (pictures) {
  const html = allPicturesTemplate(pictures)
  $('.div-of-divs').html(html)
}

module.exports = {
  onGetAllPicturesSuccess
}
