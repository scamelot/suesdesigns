let currentPage = 'flowers'

const $$ = document.querySelector.bind(document)

let flowerImages = []
let glassImages = []

$.getJSON("./img/flowers", data => {
    flowerImages = data
})
console.log(flowerImages)