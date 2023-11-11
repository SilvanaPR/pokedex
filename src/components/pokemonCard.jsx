import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { getTypeClass } from "./pokemon";
import { deleteMember } from "../App";
import { useState } from "react";


const PokemonCard = ({ pokemon, index, moveCard, onTeamUpdate }) => {

    const [team, setTeam] = useState([...window.team]);    

    const [, ref] = useDrag({
      type: "POKEMON", 
      item: { id: pokemon.id, index },
    });
  
    const [, drop] = useDrop({
      accept: "POKEMON",
      hover: (draggedItem) => {
        if (draggedItem.index !== index) {
          moveCard(draggedItem.index, index);
          draggedItem.index = index;
        }
      },
    });

    const handleDeleteMember = (pokemon) => {
      deleteMember(pokemon);
      setTeam((prevTeam) => prevTeam.filter((p) => p.id !== pokemon.id)); 
    };
  
    return (
      <div ref={(node) => ref(drop(node))} className={`${getTypeClass(pokemon.types[0].type.name)} rounded-md pl-8 pr-4 py-10 grid grid-cols-12 relative lg:px-6 col-span-4 xs:col-span-6 bg-local lg:pl-12`} style={{ backgroundImage: `url('../assets/images/pokeball.jpg')` }}>
        <div className="card-body gap-x-6 gap-y-16 col-span-8 xs:col-span-6">
          <div className="card-top">
            <h3 className="capitalize font-heywow font-bold text-lg xs:text-sm text-3xl md:text-xl              text-gray-50 lg:text-3xl">
              {pokemon.name}
            </h3>
          </div>

          <button className="absolute top-0 left-0 pl-6 pt-4 opacity-30 text-gray-50 font-heywow text-2xl" onClick={() => {handleDeleteMember(pokemon) }}>X</button>

          <div className="grid grid-cols-12 relative mt-2 gap-x-4">
            <div className="text-sm leading-6 col-span-4">
              <div className="flex flex-col text-xs gap-y-1 gap-x-4 ">
                {pokemon.types.map((type, idx) => (
                  <a
                    href="#"
                    className="relative z-10 rounded-full bg-opacity-20 bg-gray-50 px-2 py-1.5 font-medium capitalize font-heywow text-gray-50 text-center lg:text-md"
                    key={idx}
                  >
                    {type.type.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="pokemon-img flex justify-end col-span-4 gap-x-8 gap-y-16 mx-0 max-w-none col xs:col-span-6">
          <div className="absolute top-0 right-0 pr-6 pt-4 opacity-30 text-gray-50 font-heywow text-3xl">
            #{pokemon.id.toString().padStart(3, "0")}
          </div>
          <img src={pokemon.sprites.other.dream_world.front_default} className="w-full z-50" alt={pokemon.name} />
        </div>
      </div>
    );
  };

  export default PokemonCard;