const $$ = document.querySelector.bind(document)
let currentPage = 'flowers'

class GalleryImage {
    constructor(name, src, alt="picture") {
        this.name = name
        this.src = src
        this.alt = alt
        this.id = ''
        this.element = {}
    }
}

let assets = {
    flowers: {
        count: 19,
        bgcolor: 'white',
        modalcolor: 'rgba(255,255,255,0.9)',
        color: 'rgb(68, 95, 58)',
        images: []
    },
    glass: {
        count: 38,
        bgcolor: 'black',
        modalcolor: 'rgba(0,0,0,0.9)',
        color: 'white',
        images: []
    }
}
const types = ['flowers','glass']

const modal = $$('#modal')
const modalImg = $$('#modalImg')
const modalText = $$('caption')
const modalClose = $$('.close')

types.forEach(type => {
    document.querySelector(`#${type}`).addEventListener('click', changePage, type)
    for(i=1;i<=assets[type].count; i++) {
        assets[type].images.push(new GalleryImage(`image${i}`,`./img/${type}/${i}.jpeg`))
    }
})

console.table(assets)
$$('#flowers').click()

function changePage(type) {
    console.log('You clicked me!')
    let galleryHTML = ""
    type = type.target.innerHTML.toLowerCase()
    //change style based on page
    $$('html').style.background = assets[type].bgcolor
    $$('html').style.color = assets[type].color
    modal.style.background = assets[type].modalcolor
    $$('#logo').data = `./img/logo${type}.svg`

    assets[type].images.forEach(image => {
        thisID = image.src.split('/').pop()
        galleryHTML += `<img src=${image.src} id=${image.name}>`
        image.id = thisID
    })
    $$("#galleryMain").innerHTML = galleryHTML

// Add modality to each image
    assets[type].images.forEach(image => {
        console.log(image.name)
        $$(`#${image.name}`).addEventListener('click', () => {
            modal.style.display = "block"
            modalImg.src = image.src
            captionText.innerHTML = this.alt
        })
    })
}

modalClose.addEventListener('click', () => {
    modal.style.display = "none"
})





