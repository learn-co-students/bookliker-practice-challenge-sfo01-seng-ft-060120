document.addEventListener("DOMContentLoaded", function() {
    
    fetch('http://localhost:3000/books')
    .then(res => res.json())
    .then(json => json.forEach(element => {
        listAllBooks(element)
    }))

    const newBookForm = () => {

        let div = document.getElementById('list-panel')
        let formDiv = document.createElement('div')
        formDiv.id = 'new-book'
        formDiv.innerHTML = `
        <h3>New Book:</h3>
        <form id='new-book-form'>
            <input id='title' placeholder='title...'>
            <input id='description' placeholder='description...'>
            <input id='img_url' placeholder='image...'>
            <input type='submit' value='submit'>
        </form>
        `
        div.appendChild(formDiv)

        formDiv.addEventListener('submit', (e) => {
            e.preventDefault()
            createBook(e)
        })

    }
    newBookForm()

    const createBook = (e) => {

        let data = {
            title: e.target[0].value,
            subtitle: '',
            description: e.target[1].value,
            author: '',
            img_url: e.target[2].value,
            users: []
        }

        fetch('http://localhost:3000/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(json => {
            let ul = document.getElementById('list')
            let li = document.createElement('li')
            li.innerText = json.title
            ul.appendChild(li)
            li.addEventListener('click', (e) => getBookImage(json, e))
        })


    }

    const listAllBooks = (book) => {
        let list = document.getElementById('list')
        let li = document.createElement('li')
        li.textContent = book.title
        list.appendChild(li)
        li.addEventListener('click', (e) => getBookImage(book, e))
    }

    const getBookImage = (book, e) => {
        let div = document.getElementById('show-panel')
        div.innerHTML = `
            <img src='${book.img_url}'>
            <h4>${book.title}</h4>
            <p>${book.description}</p>
            <button id='like'><3</button>
        `
        let button = document.getElementById('like')
        button.addEventListener('click', () => handleLike(book))
        let userListUl = document.createElement('ul')
        userListUl.id = 'user-list'
        book.users.forEach(user => {
            let userLi = document.createElement('li')
            userLi.innerText = user.username
            userListUl.appendChild(userLi)
        })
        div.appendChild(userListUl)
    }

    const handleLike = (book) => {
        // console.log(book)
        let users = book.users
        const currentUser = {"id":1, "username":"pouros"}
        users.push(currentUser)
        let userLikesList = document.getElementById('user-list')
        let li = document.createElement('li')
        li.innerText = currentUser.username
        userLikesList.appendChild(li)
        fetch(`http://localhost:3000/books/${book.id}`, {
            method: 'PATCH',
            body: JSON.stringify({users: users}),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(res => res.json())
        .then(json => console.log(json))
    }

});
