
// fetch and display books on page load
 fetch('http:/localhost:3000/books')
.then(response => response.json())
.then(books => {
    displayBooks(books);
});

// / function to diplay books in the table
     function displayBooks(books) {
        const bookTable = document.getElementById('bookList');
          bookTable.innerHTML = '';     //   clear table book
        
        
        books.forEach(book => {
            console.log(book._id)
            const row = bookTable.insertRow();
            row.insertCell().textContent = book.title;
            row.insertCell().textContent = book.author;
            row.insertCell().textContent = book.genre;
            row.insertCell().textContent = book.quantity;
            row.insertCell().textContent = book.price;

            const actionsCell = row.insertCell();
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.classList.add('btn', 'btn-sm', 'btn-primary');
              editButton.addEventListener('click', (event) => {
                // const bookId = event.target.parentElement.parentElement
                handleEditBook(book._id);
            });
            // add eventlistner for edit functionality
            actionsCell.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('btn', 'btn-sm', 'btn-danger');
            deleteButton.addEventListener('click', (event) => {
                // const bookId = event.target.parentElement.parentElement
                handleDeleteBook(book._id);
            });
            actionsCell.appendChild(deleteButton)
        });
     }

     
    //  add eventlistner for form submission
    const addBookForm = document.getElementById('addBookForm')
     addBookForm.addEventListener('submit',  (event) => {
        event.preventDefault();

// To get all values from client side
        const titleInput = document.getElementById('title');
        const authorInput = document.getElementById('author');
        const genreInput = document.getElementById('genre');
         const quantityInput = document.getElementById('quantity');
          const priceInput = document.getElementById('price');

// create book data
        const bookData = {
            title: titleInput.value,
            author: authorInput.value,
            genre: genreInput.value,
            quantity: quantityInput.value,
             price: parseFloat(priceInput.value),
            
        };

        console.log(bookData)
        // Passing book data to Server, to be saved to db
        fetch('http:/localhost:3000/books', {
            method: 'POST',
            
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookData)
        })
        .then(response => response.json())
        .then(newBook => {

            // clear form field
          titleInput.value = '';
          authorInput.value = '';
          genreInput.value = '';
          quantityInput.value = '';
          priceInput.value = '';

         console.log('Book added successfuly:', newBook);
         alert('Book added successfuly!');

// fetxh and display updated books (optional)
         fetch('http:/localhost:3000/books')
         .then(response = response.json())
         .then(books => displayBooks(books));
        })
        .catch(error  =>{
            console.log('error adding book:', error)
            alert('error adding book, please try again')
        });
     });

// fetxh and display updated books (optional)
     function handleDeleteBook(bookId) {
        if(confirm('Are you sure you want to delete this book?')) {
            fetch(`http:/localhost:3000/books/${bookId}`, {
             method: 'DELETE'
            })
            .then(()=>{
                // remove the book row from the table
                // fetch and display updated book(optional)
                fetch('http:/localhost:3000/books')
                .then(response => response.json())
                .then(books => displayBooks(books) )
                alert('book deleted successfuly!');
            })
            .catch(error =>{
                console.eeror('error deleting book',error);
                alert('error deleting book, please try again.');
            });
        }
     }

       function handleEditBook(bookId) {
        if(confirm('Are you sure you want to edit this book?')) {
            fetch(`http:/localhost:3000/books/${bookId}`, {
             method: 'EDIT'
            })
            .then(()=>{
                // edit the book row from the table
                // fetch and display updated book(optional)
                fetch('http:/localhost:3000/books')
                .then(response => response.json())
                .then(books => displayBooks(books) )
                alert('book edited successfuly!');
            })
            .catch(error =>{
                console.eeror('error editing book',error);
                alert('error deleting book, please try again.');
            });
        }
     }