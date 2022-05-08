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

const prevImage = $$('#prevImage')
const carouselImage = $$('#currentImage')
const nextImage = $$('#nextImage')

modal.addEventListener('click', () => {
    modal.style.display = "none"
})

//Build Galleries
types.forEach(type => {
    document.querySelector(`#${type}`).addEventListener('click', changePage, type)
    for(i=1;i<=assets[type].count; i++) {
        assets[type].images.push(new GalleryImage(`image${i}`,`./img/${type}/${i}.jpg`))
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
    
    //advance slide indices
    slideIndex++
    let prevIndex = slideIndex - 1
    let nextIndex = slideIndex + 1

    //taurus
    if (slideIndex >= slides.length) {
        slideIndex = 0
    }
    if (slideIndex == 0) {
        prevIndex = slides.length - 1
    }
    if (slideIndex == slides.length - 1) {
        nextIndex = 0
    }

    //change thumbnails
    prevImage.src = slides[prevIndex].thumb
    carouselImage.src = slides[slideIndex].thumb
    nextImage.src = slides[nextIndex].thumb

    //allow clicks
    let images = [prevImage,carouselImage,nextImage]
    images.forEach(image => {
        makeModal(image)
    })

    //Swipable
    // addSwipeEvent(carouselImage, "swipeLeft", function() {
    //     fadeOut(carouselImage)
    //     carouselImage.src = nextImage.src
    //     fadeIn(carouselImage)
    // })
    // addSwipeEvent(carouselImage, "swipeRight", function() {
    //     fadeOut(carouselImage)
    //     carouselImage.src = prevImage.src
    //     fadeIn(carouselImage)
    // })

    fadeOutTimer = setTimeout(fadeOut(prevImage),3700)
    fadeInTimer = setTimeout(fadeIn(carouselImage),4000)

    timeout = setTimeout(showSlides, 4000) // Change image every 4 seconds
}

//animations
function fadeIn(image) {
    image.classList.remove('fadeOut')
    image.classList.add('fadeIn')
}
function fadeOut(image) {
    image.classList.remove('fadeIn')
    image.classList.add('fadeOut')
}

//MODALITY
function makeModal(element) {
    element.addEventListener('click', () => {
        modal.style.display = "block"
        modalImg.src = ''
        let fullRes = element.src.split('/')
        fullRes.splice(fullRes.indexOf('thumbs'),1)
        fullRes = fullRes.join('/')
        console.log(fullRes)
        modalImg.src = fullRes
        // modalText.innerHTML = this.alt
    })
}


