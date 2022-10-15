const PokemonName = document.querySelector('.pokemon_name');
const PokemonNumber = document.querySelector('.pokemon_number');
const PokemonImagem = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input= document.querySelector('.input_search');
const buttonPrev= document.querySelector('.btn-prev');
const buttonNext= document.querySelector('.btn-next');

let searchpokemon = 1;

const fetchpokemon = async (Pokemon)=>{
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${Pokemon}`);
    
    if (APIResponse.status===200) {
    
   const data = await APIResponse.json();
   return data ;
}
}
const renderPokemon = async (Pokemon)=> {
    
    PokemonName.innerHTML ='loading...';
    PokemonNumber.innerHTML = '';

    const data = await fetchpokemon (Pokemon);
    
    if (data){
    PokemonImagem.style.display = 'block';
    PokemonName.innerHTML = data.name;
    PokemonNumber.innerHTML = data.id;
    PokemonImagem.src = data['sprites']['versions']['generation-v']['black-white']['animated']
    ['front_default']; 
    input.value = '';
    searchpokemon = data.id;
} else{
    PokemonImagem.style.display = 'none';
    PokemonName.innerHTML = 'Not found,treinador ';
    PokemonNumber.innerHTML = '';
}
}

    form.addEventListener('submit', (Event)=>{
    Event.preventDefault();
    renderPokemon(input.value.toLowerCase());  
});

buttonPrev.addEventListener('click', ()=>{
    if (searchpokemon > 1){
    searchpokemon -= 1;  
    renderPokemon(searchpokemon); 
 }
});

buttonNext.addEventListener('click', ()=>{
    searchpokemon += 1;  
    renderPokemon(searchpokemon);
});

    
renderPokemon('2');