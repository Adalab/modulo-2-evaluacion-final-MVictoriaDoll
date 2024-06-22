'use strict';
// Query Selector

const charactersUl = document.querySelector('.js__character');

const charactersElements = document.querySelector('.js__listcharacters');

// variables

let characters = [];


// Get data 


const getApiData = () => {
    fetch('//api.disneyapi.dev/character?pageSize=50')
    .then(response => response.json())
    .then(data =>{
        characters = data.data;
        paintcharacters();
    });
};

// Paint Characters

const getCharactersHtmlCode = (character) => {
    
   let imageUrl = '';
  
   if (character.imageUrl) {
      imageUrl = character.imageUrl;  
    } else {
      character.imageUrl = `https://via.placeholder.com/210x295/ffffff/555555/?text=Disney`;
    }
    
    let htmlCode = '';

    htmlCode += `<article class="card">`;
    htmlCode += `<img src="${character.imageUrl}" class="card-img" alt="${character.name}"">`;
    htmlCode += `<h3 class= "card__name">${character.name} </h3>`;
    htmlCode += `</article>`;
   
    return htmlCode;
};

const paintcharacters = () => {
  let charactersCode = '';
  
  for (let character of characters){
    charactersCode += getCharactersHtmlCode(character);
  }
  charactersElements.innerHTML = charactersCode;

};

// Start web

getApiData();


// Funciones

// Funciones de Eventos (Handler)

// Eventos

// Codigo cuando carga la pagina

/*charactersUl.innerHTML = '';*/



