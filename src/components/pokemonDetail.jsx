import React from "react";
import {getTypeClass} from './pokemon';
import { handleConfirmationAlert, handleErrorAlert } from "../App";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { useState } from 'react';

const Detail = (props) => {
    const { pokemon, onClose, onNextClick, onPrevClick } = props;
    const [selectedCategory, setSelectedCategory] = useState('about');

    if (!pokemon) {
        return null;
    }

    const addTeam = (pokemon) => {
        const isPokemonInTeam = window.team.some((teamPokemon) => teamPokemon.name === pokemon.name);
    
        if (window.team.length < 6) {
            if (!isPokemonInTeam) {
                window.team.push(pokemon);
                localStorage.setItem('teamArray', JSON.stringify(window.team));
                handleConfirmationAlert('Pokemon Added');
            } else {
                handleErrorAlert('Error', 'You already have that pokemon on your team');
            }
        } else {
            handleErrorAlert('Your team is full', 'Your team can only have 6 pokemons');
        }
    };
    

    // CHART  ------------------------------------------------------------------------------------------------------

    Chart.register(LinearScale, CategoryScale, BarElement);
    const data = {
        labels: pokemon.stats.map((stat) => `${stat.stat.name} (${stat.base_stat})`),
        datasets: [
          {
            label: 'Stats del Pokémon',
            data: pokemon.stats.map((stat) => stat.base_stat),
            backgroundColor: pokemon.stats.map((stat) => (stat.base_stat < 50 ? 'rgba(255, 0, 0, 0.5)' : 'rgba(0, 255, 0, 0.5)')),
            borderColor: 'white', 
            borderWidth: 3,
            borderRadius: 10,
          },
        ],
    };
    
    const options = {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                display:false,
                grid: {
                  display: false,
                }
            },
            y: {
                grid: { display: false, },
                ticks: {
                    font: {
                      weight: 'bold',
                      family: 'sans-serif',
                      color: 'rbg(156, 163, 175)'
                    },
                  },
            },
        },
    };
      
    // INFORMATION  ------------------------------------------------------------------------------------------------------

    const handleCategory = (cat) => {
        setSelectedCategory(cat);
    };

    return (
        <div className={`${getTypeClass(pokemon.types[0].type.name)} fixed rounded-md z-50 bottom-0 inset-x-4 md:inset-x-32 lg:instet-x-64 inset-y-20`}>
            <div className="pt-8 relative fixed top-0 w-full h-1/2 flex flex-col items-center z-30 relative ">
                <div className="grid grid-cols-12 ">
                    <h3 className="col-span-12 capitalize font-heywow font-bold text-lg text-2xl sm:text-2xl text-gray-50 text-center lg:text-3xl">{pokemon.name}</h3>

                    <div className="flex text-xs gap-x-2 text-sm mx-2 my-1 col-span-12">
                        {pokemon.types.map((type, idx) => {
                        return <a href="#" className="relative z-10 rounded-full bg-opacity-20 bg-gray-50 px-3 py-1.5 font-medium capitalize font-heywow text-gray-50 text-center sm:text-sm lg:text-md" key={idx}> {type.type.name}</a>;
                        })}
                    </div>      
                </div>

                <div className="absolute top-0 right-0 pr-8 pt-6 opacity-30 text-gray-50 font-heywow text-4xl lg:text-4xl">#{pokemon.id.toString().padStart(3, '0')}  </div>  

                <button className="absolute top-0 left-0 pl-8 pt-6 opacity-90 text-gray-50 font-heywow text-3xl" onClick={onClose}>X</button>

                <button className={`mt-20 mr-6 lg:mt-16 p-2 absolute top-0 right-0 text-gray-50 font-heywow md:text-lg lg:text-2xl text-sm rounded-full border-2 hover:bg-gray-50 hover:text-gray-400 `} onClick={() => addTeam(pokemon)}>+ team</button>

       
                <button className={`mb-2 ml-8 px-1 pb-1 md:px-2 md:pb-2 absolute bottom-0 left-0 text-gray-50 font-heywow text-3xl rounded-full border-2 hover:bg-gray-50 hover:text-gray-400`} onClick={onPrevClick}>&lt;</button>

                <button className={`mb-2 mr-8 px-1 pb-1 md:px-2 md:pb-2 absolute bottom-0 right-0 text-gray-50 font-heywow text-3xl rounded-full border-2 hover:bg-gray-50 hover:text-gray-400`} onClick={onNextClick}>&gt;</button>

                <div className="pt-12 z-50 fixed mt-6 sm:mt-8 w-1/6 md:w-1/6 md:mt-12 lg:w-1/12 lg:mt-14 absolute top-1/12 left-2/12">
                   <img src={pokemon.sprites.other.dream_world.front_default} /> 
                </div>
     
            </div>

            <div className="py-10 sm:py-6 w-full h-1/2 flex flex-col z-40 bg-gray-100 rounded-md pl-2 grid grid-cols-12 ">
                <div className="col-span-12 mx-6 font-bold text-gray-400 ">
                    <button className="px-4 hover:text-gray-900" onClick={() => handleCategory("about")}>About</button>
                    <button className="px-4 hover:text-gray-900" onClick={() => handleCategory("stats")}>Base Stats</button>
                </div>     

                {selectedCategory === 'stats' && (<div className="col-span-12 mx-8 sm:mt-6 self-align-start md:mt-4 lg:mt-6 font-heywow mb-4">
                    <Bar data={data} options={options} />
                </div>)}
                   
                {(selectedCategory === 'about') && (
                    <div className="col-span-12 mx-6">
                    <table className="table-auto border-spacing-4 m-4 sm:mt-6 self-align-start md:mt-4 lg:mt-6">
                        <tbody>
                            <tr className="grid grid-cols-12">
                                <td className="font-normal sm:text-lg capitalize font-heywow text-gray-800 col-span-4 sm:col-span">Species</td>
                                {pokemon.types.map((type, index) => {
                                return <td key={index} className="font-bold capitalize font-heywow text-gray-800 sm:text-lg col-span-3">
                                            {type.type.name}
                                        </td>;
                                })}
                            </tr>   
                            <tr className="grid grid-cols-12">
                                <td className="font-normal capitalize font-heywow text-gray-800	sm:text-lg col-span-4">Height</td>
                                <td className="font-bold capitalize font-heywow text-gray-800 sm:text-lg">{pokemon.height}</td>
                            </tr>  
                            <tr className="grid grid-cols-12">
                                <td className="font-normal capitalize font-heywow text-gray-800	sm:text-lg col-span-4">Weight</td>
                                <td className="font-bold capitalize font-heywow text-gray-800 sm:text-lg">{pokemon.weight}</td>
                            </tr>  
                            <tr className="grid grid-cols-12">
                                <td className="font-normal capitalize font-heywow text-gray-800	 col-span-4 sm:text-lg">Abilities</td>
                                {pokemon.abilities.map((ability, index) => {
                                return <td key={index} className="font-bold capitalize font-heywow text-gray-800 sm:text-lg col-span-3">
                                            {ability.ability.name}
                                        </td>;
                                })}
                            </tr>  
                        </tbody> 
    
                    </table>
                    </div>    
                )}        
                
            </div>
  
        </div>
    );      
}

export default Detail;