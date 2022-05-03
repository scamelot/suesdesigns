const $$ = document.querySelector.bind(document)
let currentPage = 'flowers'
let slideIndex = 0
let timeout = null

class GalleryImage {
    constructor(name, src, alt="picture") {
        this.name = name
        this.src = src
        this.alt = alt
        this.id = ''
        this.element = {}
        this.thumb = this.linkThumb()
    }

    linkThumb() {
        let filename = this.src.split('/').pop().split('.')
        filename = [filename[0], 'jpg'].join('.')
        const path = this.src.split('/').slice(0,-1)
        path.push(`thumbs`)
        path.push(filename)
        return path.join('/')
    }
}

//ASSETS HOLDER
let assets = {
    flowers: {
        count: 19,
        bgcolor: 'white',
        modalcolor: 'rgba(255,255,255,0.9)',
        color: 'rgb(68, 95, 58)',
        images: [],
        thumbs: []
    },
    glass: {
        count: 38,
        bgcolor: 'black',
        modalcolor: 'rgba(0,0,0,0.9)',
        color: 'white',
        images: [],
        thumbs: []
    },
    about: {
        images: []
    }
}
const types = ['flowers','glass', 'about']

const modal = $$('#modal')
const modalImg = $$('#modalImg')
const modalText = $$('#caption')
const modalClose = $$('.close')
const carouselImage = $$('#currentImage')

modalClose.addEventListener('click', () => {
    modal.style.display = "none"
})

//Build Galleries
types.forEach(type => {
    document.querySelector(`#${type}`).addEventListener('click', changePage, type)
    for(i=1;i<=assets[type].count; i++) {
        assets[type].images.push(new GalleryImage(`image${i}`,`./img/${type}/${i}.jpeg`))
    }
})

//Start with Flowers
console.table(assets)
$$('#flowers').click()

function changePage(type) {
    let galleryHTML = ""
    type = type.target.innerHTML.toLowerCase()
    currentPage = type
    clearTimeout(timeout)
    if (type=='about') {
        carouselImage = assets.about.images[0]
    }
    else {
        showSlides()
        //change style based on page
        $$('html').style.background = assets[type].bgcolor
        $$('html').style.color = assets[type].color
        modal.style.background = assets[type].modalcolor
        modalClose.style.color = assets[type].color
        $$('#logo').data = `./img/logo${type}.svg`

        assets[type].images.forEach(image => {
            thisID = image.src.split('/').pop()
            galleryHTML += `<img src=${image.thumb} id=${image.name} class='image fadeIn'>`
            image.id = thisID
        })
        $$("#galleryMain").innerHTML = galleryHTML

        // Add modality to each image
        assets[type].images.forEach(image => {
            image.element = $$(`#${image.name}`)
            image.element.addEventListener('click', () => {
                modal.style.display = "block"
                modalImg.src = image.src
                // modalText.innerHTML = this.alt
            })
        })
    }
}
function showSlides() {
    carouselImage.src = '#'
    let slides = assets[currentPage].images
    slideIndex++
    if (slideIndex >= slides.length) {slideIndex = 0}
    carouselImage.src = slides[slideIndex].thumb
    makeModal(carouselImage)
    timeout = setTimeout(showSlides, 4000);// Change image every 2 seconds
}

function makeModal(element) {
    element.addEventListener('click', () => {
        modal.style.display = "block"
        modalImg.src = element.src
        // modalText.innerHTML = this.alt
    })
}


