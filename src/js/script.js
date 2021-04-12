
{
  'use strict';

  //referencja do szablonu #template-book oraz listy 
  const select = {
    templateOf: {
      bookTemplate: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',
    },
    booksCover: {
      images: '.book__image',
    },

  };
  const classNames = {
    books: {
      favoriteBook: 'favorite'
    },
  };
  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
  };

  //funkcja render
  function render (){
    for(let book of dataSource.books){
      const generatedHTML = templates.bookTemplate(book);
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      //znajdz bookList i dołącz dziecko DOM do bookList
      const containerOfBooks = document.querySelector(select.containerOf.booksList);
      containerOfBooks.appendChild(generatedDOM);
    }
  }
  render();
  


  function initActions(){

    
    const favoriteBooks =[];
    

    //referencja do listy wszystkich elementów .book_image w .booksList
    const booksContainer = document.querySelector(select.containerOf.booksList);
    const booksImage =booksContainer.querySelectorAll(select.booksCover.images);
    //pętla po każdym booksImage
    for (let bookImage of booksImage) {
      //nasłuchiwacz uruchamiający dbclick i zatrzymujący domyślne zachowanie
      bookImage.addEventListener('dblclick', function(event){
        event.preventDefault();

        //znajdź data-id
        const idBook = bookImage.getAttribute('data-id');
        //sprwdz czy ksiazka  nie zawiera id oraz nie zawieta favorite
        if( bookImage.classList.contains(!classNames.books.favoriteBook)){
        //jeśli warunek prawdziy dodaj favorite
          bookImage.classList.add(classNames.books.favoriteBook);
          // jeśli warunek prawdziwy wyślij id do nowej tablicy
          favoriteBooks.push(idBook);
        // jeśli ksiazka zawiera id i zawiera favorite
        } else if ( bookImage.classList.contains(classNames.books.favoriteBook)){
          //znajdź indeks w tej tablicy
          const indexOfidBook = favoriteBooks.indexOf(idBook);
          //usuń indeks znaleziony
          favoriteBooks.splice(indexOfidBook, 1);
          //usuń klase favorite
          bookImage.classList.remove(classNames.books.favoriteBook);
        }
      });
    }
  }
  initActions();

}
