//get the ui element
let form = document.querySelector('#book-from');
let booklist = document.querySelector('#book-list');





//book class 
class Book{
    constructor(title,author,isbn)
    {
        this.title =title;
        this.author=author;
        this.isbn = isbn;
    }
}
// ui class

class UI{
    
    static addbooklist(book)
    {
        let list = document.querySelector('#book-list');
        let row =document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">x</a></td>
        `;
        list.appendChild(row);

    }

    static clearFields()
    {
        let title = document.querySelector('#title').value='',
        author = document.querySelector('#author').value='',
        isbn = document.querySelector('#isbn').value='';
    }

    static showAlart(message,className)
    {
        let div = document.createElement('div');
        div.className = `alert ${className}`
        div.appendChild(document.createTextNode(message));
        let container = document.querySelector('.container');
        let form =document.querySelector('#book-from');

        container.insertBefore(div,form);
        setTimeout(function(){
            document.querySelector('.alert').remove();

        },3000);

    }
    static deleteFromBook(target)
    {
        if(target.hasAttribute('href'))
            {
                target.parentElement.parentElement.remove();
                Store.removeBook(target.parentElement.previousElementSibling.textContent.trim());
                UI.showAlart('Book remove','success');
            }
    }

    static displayBooks(){
        let books =Store.getBooks();
        books.forEach(book => {
            UI.addbooklist(book);
        });
    }
}
//store class
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books')==null){
            books =[];
        }
        else{
            books =JSON.parse(localStorage.getItem('books'));
        }
        return books;       
    }

    static addBook(book){
        let books = Store.getBooks();
        books.push(book);

        localStorage.setItem('books',JSON.stringify('books'));

    }
    static removeBook(isbn){
        let books =Store.getBooks();
        books.forEach((book,index)=>{
            if(book.isbn === isbn){
                book.splice(index,1);
            }
        });

        localStorage.setItem('books',JSON.stringify('books'));

    }
}

// add event listener
form.addEventListener('submit',newBook);
booklist.addEventListener('click',removeBook);
document.addEventListener('DOMContentLoaded',Store.displayBooks());


// define function

function newBook(e)
{
    e.preventDefault();
    let title = document.querySelector('#title').value,
    author = document.querySelector('#author').value,
    isbn = document.querySelector('#isbn').value;
    if(title === "" || author ==="" || isbn === "")
        {
            UI.showAlart("please fill all the fields","error");
        }
    else{
        let book = new Book(title,author,isbn);

        UI.addbooklist(book);
        UI.clearFields();
        UI.showAlart("book add","success");
        Store.addBook(book);
    }  
}

function removeBook(e)
{
    e.preventDefault();
    UI.deleteFromBook(e.target);
}