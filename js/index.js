document.addEventListener("DOMContentLoaded", function() {
    fetchAllBooks()
});

// get list of books and render them
const fetchAllBooks = () => {
    fetch('http://localhost:3000/books')
    .then(res => res.json())
    .then(json => json.forEach(book => listAllBooks(book)))
}

const listAllBooks = (book) => {
    let list = document.getElementById('list')
    let li = document.createElement('li')
    li.textContent = book.title
    li.addEventListener('click', () => getOneBook(book))
    list.appendChild(li)
}

// book show panel
let showPanel = document.getElementById('show-panel')

const getOneBook = (book) => {
    showPanel.innerHTML = `
    <img src=${book.img_url} />
    <h1>${book.title}</h1>
    <h3>${book.subtitle}</h3>
    <h4>By: ${book.author}</h4>
    <p>${book.description}</p>
    <h4>Users that like this book:</h4>
    <ul id='user-like-list'></ul>
    `
    
    let ul = document.getElementById('user-like-list')
    book.users.forEach(user => {
        let li = document.createElement('li')
        li.textContent = user.username
        ul.appendChild(li)
    })

    createButton(book)
}

// like book button
const currentUser = {"id":1, "username":"pouros"}

const createButton = (book) => {
    let button = document.createElement('button')
    let ids = []
    for (const obj of book.users) {
        ids.push(obj.id)
    }

    if (ids.includes(currentUser.id)) {
        button.textContent = 'UNLIKE'
        let index = ids.indexOf(currentUser.id)
        book.users.splice(index, 1)
        let data = { users: book.users }

        button.addEventListener('click', () => likeButton(book.id, data))
    } else {
        button.textContent = 'LIKE'
        book.users.push(currentUser)
        let data = { users: book.users }

        button.addEventListener('click', () => likeButton(book.id, data))
    }

    showPanel.appendChild(button)
}

const likeButton = (id, data) => {
    let configObj = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    }

    fetch(`http://localhost:3000/books/${id}`, configObj)
    .then(res => res.json())
    .then(json => {
        showPanel.innerHTML = ""
        getOneBook(json)
    })
}