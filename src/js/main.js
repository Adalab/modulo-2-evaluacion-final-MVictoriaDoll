'use strict';
// Query Selector

/*const charactersUl = document.querySelector('.js__character');*/

const charactersElements = document.querySelector('.js__listcharacters');
const favoritesUl = document.querySelector('.js__favoritecharacters');
const searchButton = document.querySelector('.js_searchButton');
const characterInput = document.querySelector('.js__characters-input');


// variables


let characters = [];
let favorites = [];



const handleClickCard = (ev) => {

  /*ev.currentTarget.classList.toggle('favorite');*/
  const clickedCardId = ev.currentTarget.dataset.id;
  console.log(clickedCardId);

  
  const clickedCardObj = characters.find(eachCardObj => eachCardObj._id.toString() === clickedCardId.toString());
  const clickedFavoriteObj =  favorites.find(eachCardObj => eachCardObj._id.toString() === clickedCardId.toString())
  console.log('clickenadi', clickedFavoriteObj);
  

  if (clickedFavoriteObj === undefined) {
    favorites.push(clickedCardObj);
    ev.currentTarget.classList.add('favorite');

    localStorage.setItem('favs', JSON.stringify(favorites) );

  paintFavorites ();

  }
  else {
    // Sacar de favoritos
    
    favorites.splice(clickedFavoriteObj,1);
    ev.currentTarget.classList.remove('favorite');
    

    localStorage.setItem('favs', JSON.stringify(favorites) );
    paintFavorites ();
  } 
  
  
 }

 // sacar de favoritos con evento click en la cruz
 const handleClickRemove = (ev) => {
  ev.stopPropagation();

  const clickedCardId = ev.currentTarget.dataset.id;
  console.log('Clicked remove ID:', clickedCardId);

  // Encuentra el índice del objeto en la lista de favoritos
  const clickedFavoriteIndex = favorites.findIndex(eachCardObj => eachCardObj._id.toString() === clickedCardId.toString());

  if (clickedFavoriteIndex !== -1) {
    // Elimina el objeto de favoritos
    const removedObj = favorites.splice(clickedFavoriteIndex, 1);
    console.log('Removed from favorites:', removedObj);

    // Encuentra el elemento correspondiente en la lista general y remueve la clase 'favorite'
    const cardElement = document.querySelector(`.js__charactercard[data-id="${clickedCardId}"]`);
    if (cardElement) {
      cardElement.classList.remove('favorite');
    }

    // Actualiza el localStorage y la UI
    localStorage.setItem('favs', JSON.stringify(favorites));
    paintFavorites();
  }
}

 /*const handleClickRemove = ev => {
  ev.stopPropagation();
  const clickedCardId = ev.currentTarget.dataset.id;
  let clickedCardObj = characters.find(eachCardObj => eachCardObj._id.toString() === clickedCardId.toString());
   if (clickedCardObj !== -1) {
    favorites.splice(clickedCardObj,1);
    ev.currentTarget.classList.remove('favorite');
     localStorage.setItem('favs', JSON.stringify(favorites));

    paintFavorites();
   }

  
  console.log(clickedCardId);
  
  console.log ('me han clickeado', ev.currentTarget.dataset.id);
} */

function handleClickSearch (ev) {
  ev. preventDefault();
  
  const searchedCharacter = characterInput.value;
  fetch(`https://api.disneyapi.dev/character?pageSize=50&name=${encodeURIComponent(searchedCharacter)}`)
   .then(response => response.json())
   .then(dataFromOtherFetch => {
    characters = dataFromOtherFetch.data;
    paintcharacters();
    
    if (characters) {
      cardElement.classList.add('favorite');
    }
    paintcharacters();

  })

 }


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

const loadfavorites = () => {
  const favsFromLs = JSON.parse(localStorage.getItem('favs'));
  if(favsFromLs !== null) {
    favorites = favsFromLs;
    paintFavorites();
  } 
  };

// Paint Characters

const getCharactersHtmlCode = (character, isFavorite = false) => {
    
   let imageUrl = character.imageUrl; 

if (!imageUrl) {
    imageUrl = `https://via.placeholder.com/210x295/ffffff/555555/?text=Disney`;  
  } 
    
   let htmlCode = '';

    htmlCode += `<li class="js__charactercard card" data-id="${character._id}">`;
    htmlCode += `<img src="${imageUrl}" class="card-img" alt="${character.name}"">`;
    htmlCode += `<h3 class= "card__name">${character.name} </h3>`;
    if (isFavorite) {
      htmlCode += `<button class="remove_btn js__removeFavorite" data-id="${character._id}">X</button>`;
  } 
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
    htmlCode += getCharactersHtmlCode(character, true);
  }

  favoritesUl.innerHTML = htmlCode;

  const removeButton = document.querySelectorAll('.js__removeFavorite'); 
  for (const eachButoon of removeButton) {
    console.log ('hice click', eachButoon);
    eachButoon.addEventListener('click', handleClickRemove);
  }
}
// Start web

loadfavorites(); 
getApiData();



// funciones


// Funciones de Eventos (Handler)







// Eventos
searchButton.addEventListener('click', handleClickSearch);


// Codigo cuando carga la pagina

/*charactersUl.innerHTML = '';*/



