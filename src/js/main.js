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


// al hacer click en la tarjeta del personaje
const handleClickCard = (ev) => {
 /*ev.currentTarget.classList.toggle('favorite');*/ // para ver si lo uso depués

 // obtener ID de personaje clickeado
  const clickedCardId = ev.currentTarget.dataset.id;
  /*console.log(clickedCardId);*/
  // buscamos en Array de characters el personaje correspondiente.
  const clickedCardObj = characters.find(eachCardObj => eachCardObj._id.toString() === clickedCardId.toString());
  // chequeamos si esta en favoritos. 
  const clickedFavoriteObj =  favorites.find(eachCardObj => eachCardObj._id.toString() === clickedCardId.toString());
  /*console.log('clickeando', clickedFavoriteObj);*/
  
  // si el personaje no esta en fav, se agrega a la lista, y actualizamos tmb el localStorage, y pintamos en pag
  if (clickedFavoriteObj === undefined) {
    favorites.push(clickedCardObj);
    ev.currentTarget.classList.add('favorite');

    localStorage.setItem('favs', JSON.stringify(favorites));

    paintFavorites ();

  }
  // si ya esta en favs, lo elmminamos, tambien actualizamos localStorage, y pintamos. 
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

  const clickedCardId = ev.currentTarget.dataset.id; // ver si lo podemos traer como parametro
  console.log('Clicked remove ID:', clickedCardId);

  // Encuentramo el índice del objeto en la lista de favoritos
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

    // Actualiza el localStorage y pinta personajes
    localStorage.setItem('favs', JSON.stringify(favorites));
    paintFavorites();
  }
}

// quitar toda la lista de favoritos

const handleClickRemoveAll = (ev) => {
  ev.stopPropagation();
  favorites = []; // se limpia todo el arrar de favoritos
  const removedElements = document.querySelectorAll(`.js__charactercard`);
  
  // quitar la clase favorites para cada uno de lo elementos de la lista

  removedElements.forEach(element => {
    element.classList.remove('favorite');
  })
  //Actualizo localStrorage, para que no aparezca la lista de favoritos nuevamente al recargar la pagina y se pintan personajaes de nuevo
  
  localStorage.setItem('favs', JSON.stringify(favorites));
  
  paintFavorites ();
}


// para pintar personajes que coinciden con criterio de busqueda de la usuaria 


// buscar personajes
function handleClickSearch (ev) {
  ev. preventDefault();
  
  // buscamos en la API, usando el input de la busqueda, y pintamos resultado de personajes.  
  const searchedCharacter = characterInput.value;
  fetch(`https://api.disneyapi.dev/character?pageSize=50&name=${encodeURIComponent(searchedCharacter)}`)
   .then(response => response.json())
   .then(dataFromOtherFetch => {              // objeto json obtenido para guardar datos en variable
    characters = dataFromOtherFetch.data;
    paintcharacters();
      

    // quitar la clase favorites para cada elemento de la lista
 
  
    paintcharacters();

  })

 };

// Get data. Pintar personajes en mi pag, al cargarla

const getApiData = () => {
    fetch('//api.disneyapi.dev/character?pageSize=50')
    .then(response => response.json())
    .then(data =>{
        characters = data.data;
        console.log('characters array:', characters)
        paintcharacters();
    });
};

// cargamos favoritos para pintar, desde el lovalStorage

const loadfavorites = () => {
  const favsFromLs = JSON.parse(localStorage.getItem('favs'));
  if(favsFromLs !== null) {
    favorites = favsFromLs;
    paintFavorites();
  } 
  };

// Generamos html para un personaje + btn remove para favoritos

const getCharactersHtmlCode = (character, isFavorite = false) => {
  if (!character) {
    console.error('Character is null');
    return '';
  }
    
   let imageUrl = character.imageUrl;

 if (!imageUrl) {
    imageUrl = `https://via.placeholder.com/210x295/ffffff/555555/?text=Disney`;  
  } 
   
  /*const isFavs = favorites.find(eachCardObj => eachCardObj._id.toString() === character._id.toString());
  const favoriteClass = isFavorite ? 'favorite' : '';*/
  

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

// pintamos los personajes en la pagina, que se obtuvieron de la api. Ponemos el evento click sobre cada carta. 

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


// pnyamos favs, agregamos btn x para eliminar fav y btn elminar todos los favs

function paintFavorites () {
  let htmlCode = '';
  
  for (const character of favorites) {
    htmlCode += getCharactersHtmlCode(character, true);
  }

  if (favorites.length > 0) {
    htmlCode += `<button class="removeAll_btn js__removeAllFavorites"">Eliminar todos</button>`;
  }

  favoritesUl.innerHTML = htmlCode;

  const removeButton = document.querySelectorAll('.js__removeFavorite'); 
  const removeButtonAll = document.querySelector('.js__removeAllFavorites');
  console.log('remove button', removeButtonAll);  

  for (const eachButoon of removeButton) {
    console.log ('hice click', eachButoon);
  eachButoon.addEventListener('click', handleClickRemove);
  }    
  if (removeButtonAll) {
    removeButtonAll.addEventListener('click', handleClickRemoveAll);
  }

}
// Start web

loadfavorites(); 
getApiData();

// Eventos
searchButton.addEventListener('click', handleClickSearch);




