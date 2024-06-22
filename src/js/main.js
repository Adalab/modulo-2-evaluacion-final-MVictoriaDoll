'use strict';
// Query Selector

const charactersUl = document.querySelector('.js__character');

// variables

let characters = [];


// Get data 


const getApiData = () => {
    fetch('//api.disneyapi.dev/character?pageSize=50')
    .then(response => response.json())
    .then(data =>{
        characters = data.data;
    });
};


// Start web

getApiData();


// Funciones

// Funciones de Eventos (Handler)

// Eventos

// Codigo cuando carga la pagina

/*charactersUl.innerHTML = '';*/



