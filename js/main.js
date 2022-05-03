const $$ = document.querySelector.bind(document)
let currentPage = 'flowers'
let assets = {
    flowers: {
        count: 19,
        bgcolor: 'white',
        color: 'rgb(68, 95, 58)',
        images: []
    },
    glass: {
        count: 38,
        bgcolor: 'black',
        color: 'white',
        images: []
    }
}
const types = ['flowers','glass']

types.forEach(type => {
    document.querySelector(`#${type}`).addEventListener('click', changePage, type)
    for(i=1;i<=assets[type].count; i++) {
        assets[type].images.push(`./img/${type}/${i}.jpeg`)
    }
})

console.table(assets)

function changePage(type) {
    console.log('You clicked me!')
    let galleryHTML = ""
    type = type.target.innerHTML.toLowerCase()
    console.log(type)
    $$('html').style.background = assets[type].bgcolor
    $$('html').style.color = assets[type].color
    $$('#logo').data = `./img/logo${type}.svg`

    assets[type].images.forEach(image => {
        galleryHTML += `<img src=${image}>`
    })
    
    $$("#galleryMain").innerHTML = galleryHTML
}






