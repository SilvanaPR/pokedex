import React from "react";
import {getTypeClass} from './pokemon';
import { addTeam } from "../App";

const Detail = (props) => {
    const { pokemon, onClose } = props;

    if (!pokemon) {
        return null;
    }

    return (

        <div class={`${getTypeClass(pokemon.types[0].type.name)} fixed rounded-md z-50 bottom-0 xs:inset-x-4 md:inset-x-32 lg:instet-x-64 inset-y-20`}>

            <div class="pt-8 relative fixed top-0 w-full h-1/2 flex flex-col items-center z-30 relative">
                <div class="grid grid-cols-12 ">
                    <h3 class="col-span-12 capitalize font-heywow font-bold text-lg xs:text-2xl sm:text-2xl text-gray-50 text-center lg:text-3xl">{pokemon.name}</h3>

                    <div class="flex text-xs gap-x-2 text-sm mx-2 my-1 col-span-12">
                        {pokemon.types.map((type, idx) => {
                        return <a href="#" class="relative z-10 rounded-full bg-opacity-20 bg-gray-50 px-2 py-1.5 font-medium capitalize font-heywow text-gray-50 text-center sm:text-sm lg:text-md" key={idx}> {type.type.name}</a>;
                        })}
                    </div>      
                </div>

                <div class="absolute top-0 right-0 pr-8 pt-6 opacity-30 text-gray-50 font-heywow text-4xl">#{pokemon.id.toString().padStart(3, '0')}  </div>  

                <button class="absolute top-0 left-0 pl-8 pt-6 opacity-90 text-gray-50 font-heywow text-3xl" onClick={onClose}>X</button>

                <button class={`mb-2 mr-8 p-2 absolute bottom-0 right-0 text-gray-50 font-heywow text-lg rounded-full border-2 hover:bg-gray-50 hover:text-gray-400 `} onClick={() => addTeam(pokemon)}>+ team</button>

                <div class="pt-12 z-50 fixed xs:mt-6 sm:mt-8 xs:w-1/6 md:w-1/6 md:mt-12 lg:w-1/6 lg:mt-14 absolute top-1/12 left-2/12">
                   <img src={pokemon.sprites.other.dream_world.front_default} /> 
                </div>
     
            </div>

            <div class="xs:py-10 sm:py-6 w-full h-1/2 flex flex-col z-40 bg-gray-100 rounded-md pl-2">

                <table class="table-auto border-spacing-4 xs:m-4 sm:mt-6 self-align-start md:mt-4 lg:mt-6">
                    <tbody>
                        <tr class="grid grid-cols-12">
                            <td class="font-normal sm:text-lg capitalize font-heywow text-gray-800 xs:col-span-4 sm:col-span">Species</td>
                            {pokemon.types.map((type) => {
                            return <td class="font-bold capitalize font-heywow text-gray-800 sm:text-lg xs:col-span-3">
                                        {type.type.name}
                                    </td>;
                            })}
                        </tr>   
                        <tr class="grid grid-cols-12">
                            <td class="font-normal capitalize font-heywow text-gray-800	sm:text-lg col-span-4">Height</td>
                            <td class="font-bold capitalize font-heywow text-gray-800 sm:text-lg">{pokemon.height}</td>
                        </tr>  
                        <tr class="grid grid-cols-12">
                            <td class="font-normal capitalize font-heywow text-gray-800	sm:text-lg col-span-4">Weight</td>
                            <td class="font-bold capitalize font-heywow text-gray-800 sm:text-lg">{pokemon.weight}</td>
                        </tr>  
                        <tr class="grid grid-cols-12">
                            <td class="font-normal capitalize font-heywow text-gray-800	 col-span-4 sm:text-lg">Abilities</td>
                            {pokemon.abilities.map((ability) => {
                            return <td class="font-bold capitalize font-heywow text-gray-800 sm:text-lg col-span-3">
                                        {ability.ability.name}
                                    </td>;
                            })}
                        </tr>  
                    </tbody> 

                </table>
            </div>

            
        </div>




    );      
}

export default Detail;