document.addEventListener("DOMContentLoaded", function() {
    fetch('http://localhost:3000/books')
    .then(resp => resp.json())
    .then(function(json){
        renderBooks(json)
    })

    function renderBooks(json){
        let table = document.getElementById('list')
        json.forEach(book => {
            let li = document.createElement('li')
            li.innerText = book.title
            table.appendChild(li)
            
            li.addEventListener('click', function(event){
                let show = document.getElementById('show-panel')
                let div = document.createElement('div')

                show.innerHTML = `<img src=${book.img_url}><h2>${book.title}</h2><h2>${book.author}</h2><button class='like'>Like</button>`
                
                let users = book.users
                let ul = document.createElement('ul')
                ul.classList = 'users'
                users.forEach(user => {
                    let list = document.createElement('li')
                    list.innerText = user.username
                    ul.appendChild(list)
                    show.appendChild(ul)
                })
                let button = document.querySelector('.like')
                button.addEventListener('click', (e) => likes(e, book))
            })
        })
    }

    function likes(e, book){
        e.preventDefault()
        fetch(`http://localhost:3000/books/${book.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({username: book.users.username, id: book.users.id})
        })
        .then(response => response.json())
        .then(data => {
            let show = document.getElementById('show-panel')
            let ul = document.querySelector('.users')
            let list = document.createElement('li')
            console.log(book.users)
            list.innerText = book.users.username
            ul.appendChild(list)
            show.appendChild(ul)
        })
    }

})
