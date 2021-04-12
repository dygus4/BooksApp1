
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
  

  const favoriteBooks =[];
  console.log('favoriteBooks:',favoriteBooks);

  function initActions(){
    //referencja do listy wszystkich elementów .book_image w .booksList
    const booksContainer = document.querySelector(select.containerOf.booksList);
    const booksImage =booksContainer.querySelectorAll(select.booksCover.images);
    //pętla po każdym booksImage
    for (let image of booksImage) {
      //nasłuchiwacz uruchamiający dbclick i zatrzymujący domyślne zachowanie
      image.addEventListener('dblclick', function(event){
        event.preventDefault();
        image.classList.add(classNames.books.favoriteBook);
        const idBook = image.getAttribute('data-id');
        favoriteBooks.push(idBook);
      });
    }
  }
  initActions();

}
