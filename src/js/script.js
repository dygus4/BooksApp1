
{
  'use strict';

  //referencja do szablonu #template-book oraz listy 
  const select = {
    templateOf: {
      bookTemplate: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',
    }

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
  console.log(render);
}
