console.log("Let's get this party started!");
const container = document.getElementById('results')
const text = document.getElementById('textBox')
const clear = document.getElementById('clear')
const search = document.getElementById('search')
clear.addEventListener('click', function(e) {
    e.preventDefault()
    container.innerHTML = ''
})
search.addEventListener('click', function(e) {
    e.preventDefault()
    if (text.value !== '') {
        addJif()
    }
})
async function addJif() {
    const result = await axios.get("http://api.giphy.com/v1/gifs/search", {
        params: {
            q: text.value,
            api_key: "DXr90OjjwROO065J5AsD47U7D4qG08FT"
        }
    })
    text.value = ''
    createLi(createImg(ranGif(result.data).images.original.url))
}
function ranGif(obj) {
    const indx = Math.floor(Math.random() * obj.data.length)
    return obj.data[indx]
}

function createLi(img) {
    const newLi = document.createElement('li')
    newLi.appendChild(img)
    newLi.classList.add('col-3')
    container.appendChild(newLi)
}

function createImg(url) {
    const newImg = document.createElement('img')
    newImg.src = `${url})`
    newImg.classList.add('w-100')
    return newImg
}
