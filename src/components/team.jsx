import React from "react";
import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import PokemonCard from "./pokemonCard";
import { deleteTeam, deleteMember } from "../App";

const Team = (props) => {
  const { onClose, teamUpdated, onTeamUpdate } = props;
  const [team, setTeam] = useState([...window.team]);

  const moveCard = (fromIndex, toIndex) => {
    const updatedTeam = [...team];
    const [movedCard] = updatedTeam.splice(fromIndex, 1);
    updatedTeam.splice(toIndex, 0, movedCard);
    setTeam(updatedTeam);
  };

  const handleDeleteMember = (pokemon) => {
    deleteMember(pokemon);
    setTeam((prevTeam) => prevTeam.filter((p) => p.id !== pokemon.id));
    onTeamUpdate(); 
  };


  return (
    <DndProvider backend={HTML5Backend}>
      <div class="fixed bg-gray-50 rounded-md z-50 xs:inset-x-4 md:inset-x-32 lg:inset-x-48 inset-y-20 text-xs gap-y-2 gap-x-2 grid grid-cols-12 p-10 xs:p-2 overflow-y-auto xs:inset-y-16">
        <div class="col-span-12">
          <h1 class="font-heywow font-bold xs:text-xl sm:text-3xl lg:text-6xl xl:text-7xl text-gray-600 text-center mt-4 col-span-12 mb-10 text-center xs:mt-2">
            Your Team!
          </h1>
        </div>
        <button class="absolute top-0 right-0 p-6 opacity-90 mt-5 mr-5 text-gray-50 font-heywow xs:px-3 xs:py-2 xs:text-sm bg-red-700 focus:ring-opacity-50 rounded-full p-4 mb-6 hover:bg-gray-50 hover:text-red-700 border-4 border-red-700 justify-self-center 1/2 lg:text-xl lg:mt-6 lg:mr-6"  onClick={deleteTeam}>Delete All</button>

        <button class="absolute top-0 left-0 pl-12 pt-10 opacity-90 text-gray-400 font-heywow text-6xl xs:pl-8 xs:pt-4 xs:text-2xl" onClick={onClose}>X</button>
        {team.map((pokemon, index) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} index={index} moveCard={moveCard} onTeamUpdate={onTeamUpdate}/>
        ))}
      </div>
    </DndProvider>
  );
};

export default Team;
