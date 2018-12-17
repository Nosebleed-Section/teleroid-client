'use strict'

const store = require('../store.js')

const allPicturesTemplate = require('../templates/pictures.handlebars')

const onGetAllPicturesSuccess = function (data) {
  store.pictures = data.pictures
  store.picsPerPage = 12
  store.pageNums = (data.pictures.length % store.picsPerPage) + 1
  console.log(store.pageNums)
}

const displayPageOfPictures = (page) => {
  const i = page * store.picsPerPage
  const gridrow = [
    [store.pictures[i], store.pictures[i + 1], store.pictures[i + 2]],
    [store.pictures[i + 3], store.pictures[i + 4], store.pictures[i + 5]],
    [store.pictures[i + 6], store.pictures[i + 7], store.pictures[i + 8]],
    [store.pictures[i + 9], store.pictures[i + 10], store.pictures[i + 11]]
  ]
  const html = allPicturesTemplate({ gridrow: gridrow })
  let moreHtml = ''
  if (store.pageNums > 1) {
    moreHtml += `<div class="page-number-container">`
    for (let i = 0; i <= store.pageNums; i++) {
      if (i !== page) {
        moreHtml += `<div class="page-number"><a href="#" id="${i}">${i + 1}</a></div>`
      } else {
        moreHtml += `<div>${i + 1}</div>`
      }
    }
    moreHtml += `</div>`
  }
  $('.div-of-divs').html(html)
  $('.div-of-divs').append(moreHtml)
  $('.page-number').on('click', function (event) {
    event.preventDefault()
    displayPageOfPictures(parseInt(event.target.id))
  })
}

module.exports = {
  displayPageOfPictures,
  onGetAllPicturesSuccess
}
