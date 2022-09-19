const pokemonContainer = document.querySelector('.pokemon-container');
//https://pokeapi.co/api/v2/pokedex/{id o nombre}/
//definimos las variables offset y limit para obtener 9 pokemon
let offset = 1;
let limit = 8;
const previous = document.querySelector("#previous");
const next = document.querySelector("#next")
//creamos el evento click de previous
previous.addEventListener('click', () =>{
    if(offset != 1){
        offset -=9;
        removeChildNodes(pokemonContainer);
        fetchPokemons(offset, limit);
    }
  
});
next.addEventListener('click', () => {
    offset +=9;
    removeChildNodes(pokemonContainer);
    fetchPokemons(offset, limit);
});

function fetchPokemon(id){
    fetch('https://pokeapi.co/api/v2/pokemon/'+id+'/')
    .then(res => res.json())
    .then(data => {
        createPokemon(data);
    })
}
//offset es el principio y limite el final son los rangos que trae los pokemon
function fetchPokemons(offset, limit){
    for(let i = offset;i <= offset + limit; i++){
        fetchPokemon(i);
    }
}

function createPokemon(pokemon){

    const flipCard = document.createElement('div');
    flipCard.classList.add("flip-card");

    const cardContainer = document.createElement('div');
    cardContainer.classList.add("card-container");

    flipCard.appendChild(cardContainer);
    //creamos un div que va contner el pokemon con una class pokemon-block
    const card = document.createElement('div');
    card.classList.add('pokemon-block');
    //cramosnotro div de la imagen y su class
    const spritContainer = document.createElement('div');
    spritContainer.classList.add('img-container');
    //cremao una img
    const sprite = document.createElement('img');
    sprite.src = pokemon.sprites.front_default;

    spritContainer.appendChild(sprite);
    //creamos dos p para el numero y el nombre
    const number = document.createElement('p');
    number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;

    const name = document.createElement('p');
    name.classList.add('name');
    name.textContent = pokemon.name;
    // añadimos a card el contenedor el numero y el nombre
    card.appendChild(spritContainer);
    card.appendChild(number);
    card.appendChild(name);
//añadimos a pokemonContainer card

    const cardBack = document.createElement('div');
    cardBack.classList.add('pokemon-block-back');
   
    cardBack.appendChild(progressBars(pokemon.stats));

    cardContainer.appendChild(card);
    cardContainer.appendChild(cardBack);
    pokemonContainer.appendChild(flipCard);
    
}

function progressBars(stats){
    const statsContainer = document.createElement('div');
    statsContainer.classList.add("stats-container");

    for(let i = 0; i < 3; i++){
        //colocar los tres stat primeros
        const stat = stats[i];
        const statPercent = stat.base_stat / 2 + "%"; 
        const statContainer = document.createElement('stat-container');
        statContainer.classList.add("stat-container");
        //para colocar el nombre de los stat
        const statName = document.createElement('p');
        statName.textContent = stat.stat.name;

        const progress = document.createElement('div');
        progress.classList.add("progress");

        const progressBar = document.createElement('div');
        progressBar.classList.add("progress-bar");
        progressBar.setAttribute("aria-valuenow", stat.base_stat);
        progressBar.setAttribute("aria-valuemin", 0);
        progressBar.setAttribute("aria-valuemax", 200);
        progressBar.style.width = statPercent;

        progressBar.textContent = stat.base_stat;

        progress.appendChild(progressBar);
        statContainer.appendChild(statName);
        statContainer.appendChild(progress);

        statsContainer.appendChild(statContainer);
    }

    return statsContainer;
}
function removeChildNodes(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild)
    }
}
//enseñamos los 9 primeros pokemon
fetchPokemons(offset, limit);