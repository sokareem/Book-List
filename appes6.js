// By Sinmisola Kareem using classes
class Book{
  constructor(title,author,isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI{
  addBookToList(book){
    const list = document.getElementById('book-list');
    // Create tr element
    const row = document.createElement('tr');
  
    // insert cols
    row.innerHTML = `<td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">Delete<a></td>
  `;
  
  // Append child row to list
  list.appendChild(row);
  }

  showAlert(message,className){
    // Create div
  const div = document.createElement('div');

  // Add classes
  div.className = `alert ${className}`;
  // Add text
  div.appendChild(document.createTextNode(message));
  // get parent
  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');
  //Inser alert
  container.insertBefore(div, form);

  //Timeout after 3 sec
  setTimeout(function(){
    document.querySelector('.alert').remove();
  },3000);

  }

  deleteBook(target){
    if(target.className === 'delete'){ 
      //removes from tr
      target.parentElement.parentElement.remove();
    }
  }

  clearFields(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}

// BONUS Local Storage Class
class Store{
  //fetching from local storage
  static getBooks(){
    let books;
    
    if(localStorage.getItem('books') === null){
       books = [];
    } else{
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }
  static displayBooks() {
  const books = Store.getBooks();

  books.forEach(function(book){
    const ui = new UI;


    //Add book to UI
    ui.addBookToList(book); 
  });   
  }
  

  static addBook(book){
    const books = Store.getBooks();
    

    books.push(book);

    localStorage.setItem('books',JSON.stringify(books));
  }

  static removeBook(isbn){
    const books = Store.getBooks();

    books.forEach(function(book,index){
      if(book.isbn === isbn){
        books.splice(index,1); // removes at index(1)
      }
    });
    //Updating local storage
    localStorage.setItem('books',JSON.stringify(books));
  }

}



// Event Listeners

//DOM Load Event
document.addEventListener('DOMContentLoaded',Store.displayBooks);

// Event Listeners for add Book
document.getElementById('book-form').addEventListener('submit',
function(e){
  // Get form values
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;

  //Instantiate book
  const book = new Book(title,author,isbn);

  // Instantiate UI
  const ui = new UI();

  //Validate
  if(title === '' || author === '' || isbn ===''){
    //Error Alert
    ui.showAlert('Please fill in all fields','error');
  }else{
    // Add book to list
    ui.addBookToList(book);
    // Add to local storage
    Store.addBook(book);
    //Show success
  ui.showAlert('Book Added!', 'success');

  //Clear fields
  ui.clearFields();
  }

e.preventDefault();
});

// Event Listener for Delete
document.getElementById('book-list').addEventListener('click',function(e){

  const ui = new UI();
// Delete book
  ui.deleteBook(e.target);

  //Remove from local storage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);


  //Show message
  ui.showAlert('Book removed!', 'success');
})


