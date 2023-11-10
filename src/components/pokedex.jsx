import React from "react";
import Pokemon from "./pokemon";
import Detail from "./pokemonDetail";
import Team from "./team";
import { useState } from 'react';

const Pokedex = (props) => {
  const { pokemons } = props;
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [showTeam, setShowTeam] = useState(false);
  const [teamUpdated, setTeamUpdated] = useState(false);

  const handlePokemonClick = (pokemonName) => {
    setSelectedPokemon(pokemons.find((pokemon) => pokemon.name === pokemonName));
  };

  const openTeam = () => {
    setShowTeam(true);
  };

  const closeTeam = () => {
    setShowTeam(false);
  };

  const handleTeamUpdate = () => {
    setTeamUpdated(!teamUpdated);
  };

  return (
    <div>
      <div className="header grid grid-cols-12 justify-center">
        <h1 class="font-heywow font-bold text-lg xs:text-5xl sm:text-3xl lg:text-6xl xl:text-7xl text-gray-600 text-center mt-12 col-span-12 mb-10">Pokedex</h1>

        <button
          className="font-heywow font-semibold col-span-4 lg:col-span-2 bg-gray-400 hover:bg-gray-500 focus:ring-2 rounded-full p-4 mb-6 hover:bg-gray-400 bg-gray-200 lg:col-start-6 col-start-5 text-gray-600 "
          onClick={openTeam}>Your Team</button>

        {showTeam && ( <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={closeTeam}></div> )}
        {showTeam && <Team onClose={closeTeam} teamUpdated={teamUpdated} onTeamUpdate={handleTeamUpdate} />}
      </div>

      {selectedPokemon && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={() => setSelectedPokemon(null)}
        ></div>
      )}
      <div className="pokedex-grid" class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-6 mr-8 ml-8">
        {pokemons.map((pokemon, idx) => {
          return <Pokemon pokemon={pokemon} key={pokemon.name} onClick={handlePokemonClick} />;
        })}
      </div>
      <div class="grid grid-rows-2">
        <Detail pokemon={selectedPokemon} onClose={() => setSelectedPokemon(null)} />
      </div>

    </div>
  );
};

export default Pokedex;
