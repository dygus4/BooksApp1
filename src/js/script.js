
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
    filtersOF: {
      form: '.filters',
    }


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

  /*

  //funkcja render
  function render (){
    for(let book of dataSource.books){
      const ratingBgc = determineRatingBgc(book.rating);
      const ratingWidth = book.ratingBgc * 10;
      const generatedHTML = templates.bookTemplate({
        id: book.id,
        price: book.price,
        name: book.name,
        image: book.image,
        rating: book.rating,
        ratingBgc,
        ratingWidth,
      });
          
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
    //znajdz filtry
    const form = document.querySelector(select.filtersOF.form);
    console.log('form', form);
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
    //dodaj eventListener do form
    form.addEventListener('click', function(event){
      //dodaj ify
      if(event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter'){
        console.log(event.target.value);
        if(event.target.checked == true){
          filters.push(event.target.value);
        } else if (event.target.checked == false){
          const indexOfFilters =filters.indexOf(event.target.value);
          filters.splice(indexOfFilters, 1);
        }
        console.log('filters', filters);
        
      }
      filterBooks();

    });
  }
  

  const filters = [];
  
  function filterBooks(){
    for(let book of dataSource.books){
      let shouldBeHidden = false;

      for(const filter of filters){
        if(!book.details[filter]){
          shouldBeHidden = true;
          break;
        }
      }
      const id = book.id;
      console.log(id);
       
      const item = document.querySelector('.book__image[data-id="'+id+'"]');
    
      if(shouldBeHidden == true){
        item.classList.add('hidden');
      } else if (shouldBeHidden == false){
        item.classList.remove('hidden');
      }
    }
  }

  function determineRatingBgc(rating){
    let background = '';
    if(rating < 6){
      background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    }else if(rating > 6 && rating <= 8){
      background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    }else if(rating > 8 && rating <= 9){
      background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    }else if(rating > 9){
      background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }
    return background;
  }

  initActions();


*/

  class BooksList {
    constructor(){
      const thisBooksList = this;

      thisBooksList.initData();
      thisBooksList.getElements();
      thisBooksList.render();
      thisBooksList.initActions();
      thisBooksList.determineRatingBgc();
    }

    render (){
      const thisBooksList = this;

      for(let book of thisBooksList.data){
        const ratingBgc = thisBooksList.determineRatingBgc(book.rating);
        const ratingWidth = book.ratingBgc * 10;
        const generatedHTML = templates.bookTemplate({
          id: book.id,
          price: book.price,
          name: book.name,
          image: book.image,
          rating: book.rating,
          ratingBgc,
          ratingWidth,
        });
              
        const generatedDOM = utils.createDOMFromHTML(generatedHTML);
        //znajdz bookList i dołącz dziecko DOM do bookList
        
        thisBooksList.containerOfBooks.appendChild(generatedDOM);
      }
    }

    initData() {
      const thisBooksList = this;
      thisBooksList.data = dataSource.books;
    }

    getElements() {
      const thisBooksList = this;

      //referenja do contianerOfBooks
      thisBooksList.containerOfBooks = document.querySelector(select.containerOf.booksList);
      //referenja do container
      thisBooksList.booksContainer = document.querySelector(select.containerOf.booksList);
      thisBooksList.booksImage =thisBooksList.booksContainer.querySelectorAll(select.booksCover.images);
      thisBooksList.form = document.querySelector(select.filtersOF.form);

      thisBooksList.filters = [];
      thisBooksList.favoriteBooks =[];
    }
    
    initActions(){
      const thisBooksList = this;

      //nasłuchiwacz uruchamiający dbclick i zatrzymujący domyślne zachowanie
      thisBooksList.booksContainer.addEventListener('dblclick', function(event){
        event.preventDefault();
        if(event.target.offsetParent.classList.contains(classNames.books.bookClass)){

          //znajdź data-id
          const idBook = event.target.offsetParent.getAttribute('data-id');
          //sprwdz czy ksiazka  nie zawiera id oraz nie zawieta favorite
          if(!thisBooksList.favoriteBooks.includes(idBook)){
          //jeśli warunek prawdziy dodaj favorite
            event.target.offsetParent.classList.add(classNames.books.favoriteBook);
            // jeśli warunek prawdziwy wyślij id do nowej tablicy
            thisBooksList.favoriteBooks.push(idBook);
            // jeśli ksiazka zawiera id i zawiera favorite
          } else {
          //znajdź indeks w tej tablicy
            const indexOfidBook = thisBooksList.favoriteBooks.indexOf(idBook);
            //usuń indeks znaleziony
            thisBooksList.favoriteBooks.splice(indexOfidBook, 1);
            //usuń klase favorite
            event.target.offsetParent.classList.remove(classNames.books.favoriteBook);
          }
        }  
      });
      
      //dodaj eventListener do form
      thisBooksList.form.addEventListener('click', function(event){
        //dodaj ify
        if(event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter'){
          console.log(event.target.value);
          if(event.target.checked == true){
            thisBooksList.filters.push(event.target.value);
          } else if (event.target.checked == false){
            const indexOfFilters =thisBooksList.filters.indexOf(event.target.value);
            thisBooksList.filters.splice(indexOfFilters, 1);
          }
          console.log('filters', thisBooksList.filters);
        
        }
        thisBooksList.filterBooks();

      });
    }
    
    filterBooks(){
      const thisBooksList = this;

      for(let book of thisBooksList.data){
        let shouldBeHidden = false;
    
        for(const filter of thisBooksList.filters){
          if(!book.details[filter]){
            shouldBeHidden = true;
            break;
          }
        }
        const id = book.id;
        console.log(id);
           
        const item = document.querySelector('.book__image[data-id="'+id+'"]');
        
        if(shouldBeHidden == true){
          item.classList.add('hidden');
        } else if (shouldBeHidden == false){
          item.classList.remove('hidden');
        }
      }
    }
    
    determineRatingBgc(rating){
      let background = '';
      if(rating < 6){
        background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      }else if(rating > 6 && rating <= 8){
        background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      }else if(rating > 8 && rating <= 9){
        background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      }else if(rating > 9){
        background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
      return background;
    }
    
  }
    
  const app = new BooksList(dataSource.books);
  console.log('app', app);
}
