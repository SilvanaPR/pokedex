import React from "react";

const getTypeClass = (type) => {
    if (type === "fire") {
      return "bg-fire";
    } else if (type === "water") {
      return "bg-water";
    } else if (type === "grass") {
      return "bg-grass";
    } else if (type === "normal") {
        return "bg-normal";
    } else if (type === "flying") {
        return "bg-flying";
    } else if (type === "ghost") {
        return "bg-ghost";
    } else if (type === "dark") {
        return "bg-dark  ";
    } else if (type === "steel") {
        return "bg-steel";
    } else if (type === "ground") {
        return "bg-ground";
    } else if (type === "poison") {
        return "bg-poison";
    } else if (type === "electric") {
        return "bg-electric";
    } else if (type === "fairy") {
        return "bg-fairy";
    } else if (type === "fighting") {
        return "bg-fighting";
    } else if (type === "psychic") {
        return "bg-psychic";
    } else if (type === "ice") {
        return "bg-ice";
    } else if (type === "rock") {
        return "bg-rock";
    } else if (type === "dragon") {
        return "bg-dragon";
    } else if (type === "bug") {
        return "bg-bug";
    } else if (type === "shadow") {
      return "bg-shadow";
    } else if (type === "unknown") {
      return "bg-unknown";
    } else {
      return ""; 
    }
};


const Pokemon = (props) => {
  const { pokemon, index, onClick } = props;

  const handleClick = () => {
    onClick(pokemon.name); 
  };

  return (

    <div className={`${getTypeClass(pokemon.types[0].type.name)} rounded-md px-10 py-10 grid grid-cols-12 relative lg:px-6 hover:bg-gray-300 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110`} onClick={() => onClick(pokemon.name, index)} >
      <div  className=" gap-x-6 gap-y-16 col-span-8 xs:col-span-6">
        <div className="card-top">
          <h3 className="capitalize font-heywow font-bold text-lg xs:text-2xl sm:text-3xl lg:text-xl text-gray-50">{pokemon.name}</h3>
        </div>
        
        <div className="grid grid-cols-12 relative mt-2 gap-x-4">
        <div className="text-sm leading-6 col-span-4">
          <div className="flex flex-col text-xs gap-y-1 gap-x-4 ">
            {pokemon.types.map((type, idx) => {
              return <a href="#" className="relative z-10 rounded-full bg-opacity-20 bg-gray-50 px-2 py-1.5 font-medium capitalize font-heywow text-gray-50 text-center" key={idx}> {type.type.name}</a>;
            })}
          </div>                    
        </div>
        </div>
      </div>

      <div className="flex justify-end col-span-4 gap-x-8 gap-y-16 mx-0 max-w-none col xs:col-span-6 ">
        <div className="absolute top-0 right-0 pr-6 pt-4 opacity-30 text-gray-50 font-heywow text-3xl">#{pokemon.id.toString().padStart(3, '0')}  </div>   
        <img src={pokemon.sprites.other.dream_world.front_default} className="w-full " />
      </div>
    </div>
     
  );
};

export default Pokemon;
export {getTypeClass};