export const searchPokemonName = async (pokemon) => {
    try {
      let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (err) {}
  };
  
  export const getPokemons = async (limit = 20, offset = 0) => {
    try {
      let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (err) {}
  };

  export const searchPokemonType = async (type) => {
    try {
      let url = `https://pokeapi.co/api/v2/type/${type}`;
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (err) {}
  };
  
  export const getPokemonData = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (err) {}
  };

  export const getTypePokemon = async () => {
    try{
      const response = await fetch (`https://pokeapi.co/api/v2/type`);
      const data = await response.json();
      return data;
    } catch (err) {}

  }



  