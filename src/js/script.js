
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
      favoriteBook: 'favorite',
      bookClass: 'book__image'
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
    console.log(booksImage);
    //pętla po każdym booksImage
    //for (const bookImage of booksImage) {
    //nasłuchiwacz uruchamiający dbclick i zatrzymujący domyślne zachowanie
    booksContainer.addEventListener('dblclick', function(event){
      event.preventDefault();
      if(event.target.offsetParent.classList.contains(classNames.books.bookClass)){

        //znajdź data-id
        const idBook = event.target.offsetParent.getAttribute('data-id');
        //sprwdz czy ksiazka  nie zawiera id oraz nie zawieta favorite
        if(!favoriteBooks.includes(idBook)){
        //jeśli warunek prawdziy dodaj favorite
          event.target.offsetParent.classList.add(classNames.books.favoriteBook);
          // jeśli warunek prawdziwy wyślij id do nowej tablicy
          favoriteBooks.push(idBook);
          // jeśli ksiazka zawiera id i zawiera favorite
        } else {
        //znajdź indeks w tej tablicy
          const indexOfidBook = favoriteBooks.indexOf(idBook);
          //usuń indeks znaleziony
          favoriteBooks.splice(indexOfidBook, 1);
          //usuń klase favorite
          event.target.offsetParent.classList.remove(classNames.books.favoriteBook);
        }
      }
    });
    //}
  }
  initActions();

}
