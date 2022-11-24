const searchInput = document.querySelector("#poke-input");
const searchBtn = document.querySelector(".btn-search");
const pokeContainer = document.querySelector(".poke-container");

const pokeCount = 151;
const initPokemon = async () => {
  for (let i = 1; i <= pokeCount; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  
    let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    let res = await fetch(url);
    let data = await res.json();
    createPokemonBox(data);  
};

createPokemonBox = (pokemon) => {
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const id = pokemon.id.toString().padStart(3, '0')
  const weight = pokemon.weight;

//   const type = pokemon.types[0].type.name;
let types = pokemon.types;
console.log(types);
// for (let i = 0; i < pokemon.types.length; i++) {
//     type +=  " ";


//     type +=  pokemon.types[i].type.name;
// }

  const pokemonEl = document.createElement("div");
  pokemonEl.classList.add("poke-box");
  pokemonEl.innerHTML = `
    <img
          src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png"
          alt="${name}"
        />
        <h4 class="poke-name">Name:${name}</h4>
        <p class="poke-id">ID:${id}</p>
        <p class="poke-weight">Weight:${weight}</p>
        <p class="poke-type">Type:${types.map(type => `<a>${type.type.name}</a>`)}</p>
    `;
    pokeContainer.appendChild(pokemonEl);
};

initPokemon();




searchInput.addEventListener('input', function(e){
  const pokeNames = document.querySelectorAll('.poke-name');
  const search = searchInput.value.toLowerCase();
  console.log(pokeNames);

  pokeNames.forEach((pokeName) => {
      pokeName.parentElement.style.display = 'block';
      if (!pokeName.innerHTML.toLocaleLowerCase().includes(search)) {
          pokeName.parentElement.style.display = 'none';
      }
  });
  console.log(search);
});


const setFooterDate = () => {
    const date = new Date();
    const footer = document.querySelector('footer');
    console.log(footer);
    const template = `
      <div class="licance">
        Copyright - ${date.getFullYear()}    
      </div>
    `;
    footer.innerHTML = template;
  };
  setFooterDate();
  
const getAllByType = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data.pokemon);
    } catch (error) {
      console.log(error);
    }
}

const links = document.querySelector('a');