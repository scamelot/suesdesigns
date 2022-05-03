let currentPage = 'flowers'

const $$ = document.querySelector.bind(document)

// class Asset {
//     constructor(name,image) {
//         this.name = name
//         this.image = image
//     }

// }

let assets = {
    flowers: {
        count: 19,
        images: []
    },
    glass: {
        count: 38,
        images: []
    }
}
const types = ['flowers','glass']

types.forEach(type => {
    for(i=1;i<=assets[type].count; i++) {
        assets[type].images.push(`./img/${type}/${i}.jpeg`)
    }
})

console.table(assets)

let galleryHTML = ""

assets[currentPage].images.forEach(image => {
    galleryHTML += `<img src=${image}>`
})

$$("#galleryMain").innerHTML = galleryHTML




