'use strict';
// Query Selector

/*const charactersUl = document.querySelector('.js__character');*/

const charactersElements = document.querySelector('.js__listcharacters');
console.log('charactersElements');
const favoritesUl = document.querySelector('.js__favoritecharacters')

// variables

let characters = [];
/*let imageUrl = ''; */
/*let charactersCode = '';
  let htmlCode = '';*/

// Get data 


const getApiData = () => {
    fetch('//api.disneyapi.dev/character?pageSize=50')
    .then(response => response.json())
    .then(data =>{
        characters = data.data;
        console.log('characters array:', characters)
        paintcharacters();
    });
};

// Paint Characters

const getCharactersHtmlCode = (character) => {
    
   let imageUrl = character.imageUrl; 

if (!imageUrl) {
    imageUrl = `https://via.placeholder.com/210x295/ffffff/555555/?text=Disney`;  
  } 
    
   let htmlCode = '';

    htmlCode += `<li class="js__charactercard card" data-id="${character._id}">`;
    htmlCode += `<img src="${imageUrl}" class="card-img" alt="${character.name}"">`;
    htmlCode += `<h3 class= "card__name">${character.name} </h3>`;
    htmlCode += `</li>`;
   
    return htmlCode;
};

const paintcharacters = () => {
  let charactersCode = '';
  
  for (let character of characters){
    charactersCode += getCharactersHtmlCode(character);
  }
  charactersElements.innerHTML = charactersCode;

  const charactersAllCard = document.querySelectorAll('.js__charactercard');
  for ( const eachCardArticle of charactersAllCard ){
    eachCardArticle.addEventListener('click', handleClickCard);
  }
};

// Start web

getApiData();


// funciones


// Funciones de Eventos (Handler)
 function handleClickCard (ev) {

  ev.currentTarget.classList.toggle('favorite');
  const clickedCardId = ev.currentTarget.dataset.id;

  
  /*const clickedCardObj = characters.find( eachCardObj => eachCardObj._id === clickedCardId);*/

  const clickedCardObj = characters.find(eachCardObj => eachCardObj._id.toString() === clickedCardId.toString());

  console.log('Clicked Card ID:', clickedCardId);


  let favoriteCardHtml = getCharactersHtmlCode(clickedCardObj);
  favoritesUl.innerHTML += favoriteCardHtml;
  
 }



// Eventos

// Codigo cuando carga la pagina

/*charactersUl.innerHTML = '';*/



