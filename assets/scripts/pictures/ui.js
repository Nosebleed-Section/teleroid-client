'use strict'

const store = require('../store.js')

const allPicturesTemplate = require('../templates/pictures.handlebars')

const onGetAllPicturesSuccess = function (data) {
  store.pictures = data.pictures
  store.picsPerPage = 12
  store.pageNums = (data.pictures.length % store.picsPerPage) + 1
}

const displayPageOfPictures = (page) => {
  console.log(store.pictures)
  const i = page * store.picsPerPage
  console.log(store.pictures[i])
  const gridrow = [
    [store.pictures[i], store.pictures[i + 1], store.pictures[i + 2]],
    [store.pictures[i + 3], store.pictures[i + 4], store.pictures[i + 5]],
    [store.pictures[i + 6], store.pictures[i + 7], store.pictures[i + 8]],
    [store.pictures[i + 9], store.pictures[i + 10], store.pictures[i + 12]]
  ]
  let html = allPicturesTemplate({ gridrow: gridrow })
  if (store.pageNums > 1) {
    html += '<div class="page-number-container">'
    for (let i = 0; i < store.pageNums; i++) {
      if (i !== page) {
        html += `<div class="page-number"><a href="#" id="${i}">${i + 1}</a></div>`
      } else {
        html += `<div>${i + 1}</div>`
      }
    }
  }
  html += '</div>'
  $('.div-of-divs').html(html)
  $('.page-number').on('click', function (event) {
    event.preventDefault()
    displayPageOfPictures(event.target.id)
  })
}

module.exports = {
  displayPageOfPictures,
  onGetAllPicturesSuccess
}
