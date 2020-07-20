document.addEventListener("DOMContentLoaded", function() {
    fetchAllBooks()
});

const fetchAllBooks = () => {
    fetch('http://localhost:3000/books')
    .then(res => res.json())
    .then(json => json.forEach(book => showBooks(book)))
}

const showBooks = (book) => {

    const bookList = document.querySelector('ul')
    let li = document.createElement('li')
    li.id = book.id

    li.innerText = `${book.title}`

    bookList.appendChild(li)

    li.addEventListener('click', (e) => showOneBook(book))

}

const showOneBook = (book) => {

    const showPanel = document.querySelector('#show-panel')
    const likeButton = document.createElement('button')

    showPanel.innerHTML = `
        <img src = ${book.img_url} />
        <h2>${book.title}</h2>
        <h4>${book.subtitle}</h4>
        <h4>${book.author}</h4>
        <p>${book.description}</p>
    `
    book.users.map (function(user){
        let thisUser = document.createElement('li')
        thisUser.innerText = user.username
        showPanel.appendChild(thisUser)
    })

    usernames = []
    book.users.map (function(user){
        usernames.push(user.username)
    })
    const pouros = usernames.includes("pouros")
    if (pouros === true) {
        likeButton.innerText = "Unlike"
        showPanel.appendChild(likeButton)
        showPanel.addEventListener('click', (e) => unlikeBook(book))
    } else {
        likeButton.innerText = "Like"
        showPanel.appendChild(likeButton)
        showPanel.addEventListener('click', (e) => likeBook(book))
    }  
 
}

const likeBook = (book) => {

    let users = book.users
    let i = users.length
    users[i] = {id: 1, username: "pouros"}
    let data = {
        users: users
    }

    fetch(`http://localhost:3000/books/${book.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then (res => res.json())

showOneBook(book)
    
}

const unlikeBook = (book) => {

    let users = book.users
    for (i = 0; i < users.length; i++) {
        if (users[i].username === "pouros") {
            users.splice(i,1)
        }
    }
    
    let data = {
        users: users
    }

    fetch(`http://localhost:3000/books/${book.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then (res => res.json())

showOneBook(book)
    
}