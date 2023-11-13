import React from "react";
import Pokemon from "./pokemon";
import Detail from "./pokemonDetail";
import Team from "./team";
import { useState, useEffect } from 'react';
import { searchPokemonName, getTypePokemon } from "../api";
import { getTypeClass } from "./pokemon";

const Pokedex = (all) => {
  const { pokemons } = all;
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [showTeam, setShowTeam] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('name');
  const [pokemonName, setPokemonName] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [type, setType] = useState([]);
  const [selectedType, setSelectedType] = useState([]);
  const [selectedPokemonIndex, setSelectedPokemonIndex] = useState(null);

  const handlePokemonClick = (pokemonName, index) => {
    setSelectedPokemonIndex(index);
    setSelectedPokemon(pokemons.find((pokemon) => pokemon.name === pokemonName));
  };

  const handleNextClick = () => {
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

  const openTeam = () => {
    setShowTeam(true);
  };

  const closeTeam = () => {
    setShowTeam(false);
  };

  const fetchPokemon = async (name) => {
    try {
      const data = await searchPokemonName(name);

      if (data) {
        const result = [data];
        setPokemonName(result);
      } else {
        setPokemonName([]);
      }
      
    } catch (err) {}
  };

  const handleCategory = (cat) => {
    setSelectedCategory(cat);
    
    if (cat == 'type'){
      fetchTypes();
      filterType('all'); 
    }
  };


  const handleSearch = (e) => {
    const value = e.target.value.replace(/\s/g, "");
    setSearchValue(value);

    if (searchValue !== ''){
      fetchPokemon(searchValue.toLowerCase());
    }
  };
  

  useEffect(() => {
    if (searchValue !== '') {
      fetchPokemon(searchValue.toLowerCase());
    }
    
  }, [searchValue]);

  const fetchTypes = async () => {
    try {
      const data = await getTypePokemon();
      const promises = data.results.map(async (type) => {
        return type.name;
      });
      const results = await Promise.all(promises);
      await setType(results);
    } catch (err) {}
  };
  

  const filterType = (typeName) => {
    setSearchValue(typeName);

    if (typeName === 'all') {
      setSelectedType(pokemons);
    } else {
      const filteredPokemons = pokemons.filter((pokemon) => {
        return pokemon.types.some((type) => type.type.name === typeName);
      });

      setSelectedType(filteredPokemons);
    }
  };

  return (
    <div>
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
                <input value={searchValue} onChange={handleSearch} className="p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search Pokemon..." />

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
                <button key={ty} className={`${getTypeClass(ty)} rounded-full xs:col-span-3 md:col-span-2 lg:col-span-1 py-2 capitalize font-heywow font-semibold hover:bg-gray-300 border border-gray-300 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110`} onClick={() => filterType(ty)}>{ty}</button>
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

      {selectedPokemon && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={() => setSelectedPokemon(null)}
        ></div>
      )}

      {(selectedCategory === 'name' && searchValue === '') && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-6 mr-8 ml-8">
            {pokemons.map((pokemon, idx) => {              
              return <Pokemon pokemon={pokemon} key={pokemon.name} index={idx} onClick={handlePokemonClick} />;
            })}
          </div>   
      )} 

      {selectedCategory === 'name' && pokemonName !== null && (
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
      )}

      {(selectedCategory === 'type' && selectedType.length > 0) && (
        <div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-6 mr-8 ml-8">
            {selectedType.map((pokemon, idx) => {              
              return <Pokemon pokemon={pokemon} key={pokemon.name} index={idx} onClick={handlePokemonClick} />;
            })}          
          </div>
        </div>     
      )}

      {(selectedCategory === 'type' && selectedType.length === 0) && (
        <div className="grid grid-cols-12">
          <div className="justify-self-center col-span-12 bg-gray-200 rounded-sm py-4 px-6 bg-opacity-80 ">
            <h1>Pokemon Not Found :( </h1>
          </div>    
        </div>    
      )}
      
      <div className="grid grid-rows-2">
        <Detail pokemon={selectedPokemon} onClose={() => setSelectedPokemon(null)} onNextClick={handleNextClick} onPrevClick={handlePrevClick}/>
      </div>

    </div>
  );
};

export default Pokedex;
