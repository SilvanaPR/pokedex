import React from "react";
import Pokemon from "./pokemon";
import Detail from "./pokemonDetail";
import Team from "./team";
import { useState, useEffect } from 'react';
import { searchPokemonName, getTypePokemon, searchPokemonType, getPokemonData, getPokemons } from "../api";
import { getTypeClass } from "./pokemon";

const Pokedex = () => {

  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [showTeam, setShowTeam] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('name');
  const [pokemonName, setPokemonName] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [type, setType] = useState([]);
  const [selectedType, setSelectedType] = useState([]);
  const [selectedPokemonIndex, setSelectedPokemonIndex] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [pokemons, setPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonsPerPage = 20;
  const [typePage, setTypePage] = useState(1);
  const [selectedTypeID, setSelectedTypeID] = useState(null);
  const typePokemonsPerPage = 20;


  useEffect(() => {
    const offset = (currentPage - 1) * pokemonsPerPage;
    fetchPokemons(pokemonsPerPage, offset);
    window.team = JSON.parse(localStorage.getItem('teamArray'));

    if (searchValue && searchValue !== '') {
      fetchPokemonName(searchValue.toLowerCase());
    }

  }, [currentPage, searchValue]);


  // PAGINATION  ------------------------------------------------------------------------------------------------------


  const changePage = (direction) => {
    if (direction === "next" && selectedCategory === "name") {
      setCurrentPage(currentPage + 1);
    } else if (currentPage > 1 && selectedCategory === "name") {
      setCurrentPage(currentPage - 1);
    } 
    
    else if (direction === "next" && selectedCategory === "type" && searchValue !== 'all') {
      setTypePage((prevPage) => {
        const nextPage = prevPage + 1;
        fetchPokemonsFiltered(selectedTypeID, nextPage);
        return nextPage;
      });
    } else if (typePage > 1 && selectedCategory === "type" && searchValue !== 'all') {
      setTypePage((prevPage) => {
        const prevPageValue = prevPage - 1;
        fetchPokemonsFiltered(selectedTypeID, prevPageValue);
        return prevPageValue;
      });
    }
  };

  // POKEMONS ------------------------------------------------------------------------------------------------------

  const fetchPokemons = async (limit, offset) => {
    try {
      if (searchValue == '') {setLoading(true)}
      const data = await getPokemons(limit, offset);
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url);
      });
      const results = await Promise.all(promises);
      setPokemons(results);
      if (searchValue == '') {setLoading(false)}
    } catch (err) {setLoading(false);}
  };

  // DETAIL ------------------------------------------------------------------------------------------------------

  const handlePokemonClick = async (pokemonName, index) => {
    //HANDLES POKEMON CLICK TO SEE DETAIL
    setSelectedPokemonIndex(index);
    if (selectedCategory == "name") {
      const pokemon = await fetchPokemonName(pokemonName);
      setSelectedPokemon(pokemon);
      
    } else if (selectedCategory == "type"){
      setSelectedPokemon(selectedType.find((pokemon) => pokemon.name === pokemonName));
    }
  };

  const handleNextClick = () => {
    //HANDLES NEXT POKEMON DETAIL
    if (selectedPokemonIndex !== null && selectedPokemonIndex < pokemons.length - 1 && selectedCategory == 'name' && searchValue === '') {
      const nextPokemonIndex = selectedPokemonIndex + 1;
      const nextPokemon = pokemons[nextPokemonIndex];
      setSelectedPokemonIndex(nextPokemonIndex);
      setSelectedPokemon(nextPokemon);
    } else if (selectedPokemonIndex !== null && selectedPokemonIndex < selectedType.length - 1 && selectedCategory == 'type'){
      const nextPokemonIndex = selectedPokemonIndex + 1;
      const nextPokemon = selectedType[nextPokemonIndex];
      setSelectedPokemonIndex(nextPokemonIndex);
      setSelectedPokemon(nextPokemon);  
    } 
  };

  const handlePrevClick = () => {
    //HANDLES PREVIOUS POKEMON DETAIL
    if (selectedPokemonIndex !== null && selectedPokemonIndex > 0 && selectedCategory == 'name') {
      const prevPokemonIndex = selectedPokemonIndex - 1;
      const prevPokemon = pokemons[prevPokemonIndex];
      setSelectedPokemonIndex(prevPokemonIndex);
      setSelectedPokemon(prevPokemon);
    } else if (selectedPokemonIndex !== null && selectedPokemonIndex > 0 & selectedCategory == 'type'){
      const prevPokemonIndex = selectedPokemonIndex - 1;
      const prevPokemon = selectedType[prevPokemonIndex];
      setSelectedPokemonIndex(prevPokemonIndex);
      setSelectedPokemon(prevPokemon);
    }
  };

  //TEAM ------------------------------------------------------------------------------------------------------
  const openTeam = () => {
    setShowTeam(true);
  };

  const closeTeam = () => {
    setShowTeam(false);
  };

  //FILTER ------------------------------------------------------------------------------------------------------

  const handleCategory = (cat) => {
    //HANDLES THE SELECTED CATEGORY
    setSelectedCategory(cat);
    
    if (cat == 'type'){
      fetchTypes();
      filterType('all'); 
    }
  };

  //NAME FILTER ------------------------------------------------------------------------------------------------------

  const fetchPokemonName = async (name) => {
    //FILTERS POKEMON BY NAME
    try {
      const data = await searchPokemonName(name);

      if (data) {
        const result = [data];
        setPokemonName(result);
        return result[0];
      } else {
        setPokemonName([]);
      }  
    } catch (err) {}
  };

  const handleSearch = (e) => {
    //HANDLES DE SEARCHBAR
    const value = e.target.value.replace(/\s/g, "");
    setSearchValue(value);

    if (searchValue && searchValue !== ''){
      fetchPokemonName(searchValue.toLowerCase());
    }
  };
  
  //TYPE FILTER ------------------------------------------------------------------------------------------------------

  const fetchTypes = async () => {
    //GETS ALL THE EXISTING TYPES
    try {
      const data = await getTypePokemon();
      const promises = data.results.map(async (type) => {
        return type.name;
      });
      const results = await Promise.all(promises);
      await setType(results);
    } catch (err) {}
  };

  const fetchPokemonsFiltered = async (typeID, page=1) => {
    // FILTERS POKEMON BY TYPE
    try {
      let numero = parseInt(typeID) + 1;
      const data = await searchPokemonType(numero);
  
      const startIndex = (page - 1) * typePokemonsPerPage;
      const endIndex = startIndex + typePokemonsPerPage;
  
      const promises = data.pokemon.slice(startIndex, endIndex).map(async (pokemon) => {
        return await getPokemonData(pokemon.pokemon.url);
      });
  
      const results = await Promise.all(promises);
      setSelectedType(results);
    } catch (err) {
      // Handle error
    }
  };
  
  const filterType = (typeName, name) => {
    //HANDLES THE SELECTED TYPE
    setSearchValue(name);
    setSelectedTypeID(typeName);
    setTypePage(1);
    if (typeName === 'all') {
      setSelectedType(pokemons);
      setSearchValue('all');
    } else {
      fetchPokemonsFiltered(typeName);
    }
  };


  return (
    <div className="bg-pokedex bg-repeat w-full h-full p-10 min-h-screen flex items-center justify-center">
    {loading ? (
      <div className="w-1/12 text-center">
        <div className="bg-loading bg-contain bg-no-repeat min-h-screen content-center bg-center animate-spin align-middle"></div>
      </div>
    ) : 
    (<div>
      <div className="header grid grid-cols-12 justify-center">
        <h1 className="font-heywow font-bold text-lg xs:text-5xl sm:text-4xl lg:text-6xl xl:text-7xl text-gray-600 text-center mt-12 col-span-12 mb-6">Pokedex</h1>

        <h2 className="font-heywow font-bold xs:text-xl sm:text-md lg:text-xl xl:text-2xl text-gray-600 text-center col-span-12 mb-10 rounded-sm col-span-4 col-start-5 py-2">Click them to se more...</h2>

        <div className="col-span-12 grid grid-cols-12">
          <button
            className="font-heywow font-semibold col-span-4 lg:col-span-2 bg-gray-300 hover:bg-gray-400 focus:ring-2 rounded-full p-4 mb-6 hover:bg-gray-400 bg-gray-200 lg:col-start-6 col-start-5 text-gray-600 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110`"
            onClick={openTeam}>Your Team</button> 
        </div>
        

        <div className="flex col-span-8 col-start-3 md:col-span-6 md:col-start-4 mb-8 " >

            <select className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-sm hover:bg-gray-200 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"  onChange={(e) => handleCategory(e.target.value) }>
              <option value="name">Name</option>
              <option value="type">Type</option>
            </select>

            <div className="relative w-full">
                <input value={searchValue} onChange={handleSearch} className="p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search Pokemon..." disabled={selectedCategory == "type"}/>

                <button type="button" className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-r-sm border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleSearch}>
                  <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
                  <span className="sr-only">Search</span>
                </button>

            </div>
        </div>

        <div className="col-span-12 grid grid-cols-12 gap-4 mb-8 mx-4">
          {selectedCategory === 'name' ? null : (
            <>
              <button className="bg-gray-100 rounded-full xs:col-span-3 md:col-span-2 lg:col-span-1 py-2 capitalize font-heywow font-semibold hover:bg-gray-300 border border-gray-300" onClick={() => filterType("all")}>All</button>
              {type.map((ty) => (
                <button key={ty} className={`${getTypeClass(ty)} rounded-full xs:col-span-3 md:col-span-2 lg:col-span-1 py-2 capitalize font-heywow font-semibold hover:bg-gray-300 border border-gray-300 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110`} onClick={() => filterType(type.indexOf(ty).toString(), ty)}>{ty}</button>

              ))}
            </>
          )}
        </div>

        {showTeam && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 grid grid-cols-12" onClick={closeTeam}>
            <Team onClose={closeTeam} />
          </div>
        )} 

      </div>


      { // BLUR BACKGROUND WHEN POKEMON IS SELECTED 
        selectedPokemon && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-40"
            onClick={() => setSelectedPokemon(null)}
          ></div>
        )
      }

      { // SHOW ALL POKEMONS WHEN SEARCHBAR EMPTY
        (selectedCategory === 'name' && searchValue === '') && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-6 mr-8 ml-8">
              {pokemons.map((pokemon, idx) => {              
                return <Pokemon pokemon={pokemon} key={pokemon.name} index={idx} onClick={handlePokemonClick} />;
              })}
            </div>   
        )
      } 

      { // FILTER POKEMONS BY NAME WITH SEARCHBAR
        selectedCategory === 'name' && pokemonName !== null && (
          <div className="grid grid-cols-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-6 mr-8 ml-8">
            {pokemonName.length > 0 ? (
              pokemonName.map((pokemon, idx) => (
                <Pokemon pokemon={pokemon} key={pokemon.name} index={idx} onClick={handlePokemonClick} />
              ))
            ) : (
              <div className="justify-self-center col-span-12 bg-gray-200 rounded-sm py-4 px-6 bg-opacity-80 ">
                  <h1>Pokemon Not Found :(</h1>
              </div>
            )} 
          </div>
        )
      }


      { // FILTER POKEMONS BY TYPE
        (selectedCategory === 'type' && selectedType.length > 0) && (
          <div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-6 mr-8 ml-8">
              {selectedType.map((pokemon, idx) => {              
                return <Pokemon pokemon={pokemon} key={pokemon.name} index={idx} onClick={handlePokemonClick} />;
              })}       
            </div>
          </div>     
        )
      }

      { // TYPE NOT FOUND MESSAGE
        (selectedCategory === 'type' && selectedType.length === 0) && (
          <div className="grid grid-cols-12">
            <div className="justify-self-center col-span-12 bg-gray-200 rounded-sm py-4 px-6 bg-opacity-80 ">
              <h1>Pokemon Not Found :( </h1>
            </div>    
          </div>    
        )
      }


      <div className="grid grid-cols-12 mt-8">   
        <button
            className="font-heywow font-semibold col-span-4 lg:col-span-1 bg-gray-300 hover:bg-gray-400 focus:ring-2 rounded-sm p-4 hover:bg-gray-400 bg-gray-200 text-gray-600 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110`"
            onClick={() => changePage("prev")}>PREV</button> 

         <button
            className="font-heywow font-semibold col-span-4 lg:col-span-1 bg-gray-300 hover:bg-gray-400 focus:ring-2 rounded-sm p-4 hover:bg-gray-400 bg-gray-200 col-start-9 lg:col-start-12 text-gray-600 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110`"
            onClick={() => changePage("next")}>NEXT</button>         
      </div>
      
      <div className="grid grid-rows-2">
        <Detail pokemon={selectedPokemon} onClose={() => setSelectedPokemon(null)} onNextClick={handleNextClick} onPrevClick={handlePrevClick}/>
      </div>

    </div>)}
    </div>
  );
};

export default Pokedex;
