'use strict';
// Query Selector

/*const charactersUl = document.querySelector('.js__character');*/

const charactersElements = document.querySelector('.js__listcharacters');
console.log('charactersElements');
const favoritesUl = document.querySelector('.js__favoritecharacters');
const searchButton = document.querySelector('.js_searchButton');
const characterInput = document.querySelector('.js__characters-input');


// variables

let characters = [];
let favorites = [];

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

function paintFavorites () {
  let htmlCode = '';

  for (const character of favorites) {
    htmlCode += getCharactersHtmlCode(character);
  }

  favoritesUl.innerHTML = htmlCode;

}
// Start web

getApiData();


// funciones


// Funciones de Eventos (Handler)
 function handleClickCard (ev) {

  ev.currentTarget.classList.toggle('favorite');
  const clickedCardId = ev.currentTarget.dataset.id;
  console.log(clickedCardId);
  
  const clickedCardObj = characters.find(eachCardObj => eachCardObj._id.toString() === clickedCardId.toString());
  const clickedFavoriteObj =  favorites.find(eachCardObj => eachCardObj._id.toString() === clickedCardId.toString())

  if (clickedFavoriteObj === undefined) {
    favorites.push(clickedCardObj);

  paintFavorites ();

  }
  else {
    // Sacar de favoritos
    
    favorites.splice(clickedFavoriteObj,1);
    paintFavorites ();
  } 
  
  

 }

 function handleClickSearch (ev) {
  ev. preventDefault();
  
  const searchedCharacter = characterInput.value;
  fetch(`https://api.disneyapi.dev/character?pageSize=50&name=${encodeURIComponent(searchedCharacter)}`)
   .then(response => response.json())
   .then(dataFromOtherFetch => {
    characters = dataFromOtherFetch.data;
    paintcharacters();

  })

 }

// Eventos
searchButton.addEventListener('click', handleClickSearch);

// Codigo cuando carga la pagina

/*charactersUl.innerHTML = '';*/



