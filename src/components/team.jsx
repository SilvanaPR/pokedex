import React from "react";
import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import PokemonCard from "./pokemonCard";
import { deleteTeam } from "../App";

const Team = (props) => {
  const { onClose } = props;
  const [team, setTeam] = useState([...window.team]);

  const moveCard = (fromIndex, toIndex) => {
    const updatedTeam = [...team];
    const [movedCard] = updatedTeam.splice(fromIndex, 1);
    updatedTeam.splice(toIndex, 0, movedCard);
    setTeam(updatedTeam);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };


  return (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-gray-50 rounded-sm z-50 text-xs gap-y-4 grid grid-cols-12 p-10 p-2 overflow-y-auto  col-span-12 sm:col-span-12 md:col-span-6 md:col-start-7 lg:col-span-5 lg:col-start-8 " onClick={stopPropagation}>

        <div className="col-span-12">

          <button className="y-0 pl-12 pt-10 opacity-90 text-gray-400 font-heywow pl-8 pt-4 text-4xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110" onClick={onClose}>X</button>

          <h1 className="font-heywow font-bold text-4xl sm:text-5xl md:text-4xl lg:text-5xl xl:text-5xl text-gray-600 text-center mt-4 col-span-12 text-center mt-0 mb-2">
            Your Team!
          </h1>
        </div>

        {team.length > 0 && (
            <div className="col-span-12 justify-self-center">
            <button className="opacity-90 text-gray-50 font-heywow px-6 py-2 text-lg sm:text-xl md:text-lg lg:text-xl bg-red-700 focus:ring-opacity-50 rounded-full hover:bg-gray-50 hover:text-red-700 border-4 border-red-700 justify-self-center my-2 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"  onClick={deleteTeam}>Delete All</button>
          </div>
        )}

        {team.length == 0 && (
            <div className="font-heywow font-bold text-xl justify-self-center col-span-12 bg-gray-200 rounded-sm bg-opacity-80 text-gray-600 self-center p-8 text-center">
            <h1>Your team is empty</h1>
            <h2 className="font-semibold mt-2">Start adding pokemons!</h2>
          </div>
        )}



       <div className="col-span-12">
        {team.map((pokemon, index) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} index={index} moveCard={moveCard}/>
        ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default Team;
