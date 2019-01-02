//By Sinmisola Kareem

// Book Constructor
function Book(title, author, isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}


// UI Constructor
function UI() {}
UI.prototype.addBookToList = function(book){
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

// Delete book
UI.prototype.deleteBook = function(target){
  if(target.className === 'delete'){ 
    //removes from tr
    target.parentElement.parentElement.remove();
  }
}

// Clear fields
UI.prototype.clearFields = function(){
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

//Show Alert
UI.prototype.showAlert = function(message, className){
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
  },3000)

  
}

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
  
  ui.deleteBook(e.target);

  //Show message
  ui.showAlert('Book removed!', 'success');
})