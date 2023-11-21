import './App.css';
import Pokedex from './components/pokedex';
import { getPokemonData, getPokemons } from './api';
import {useState, useEffect} from 'react';
import Swal from 'sweetalert2';

window.team = [];



const addTeam = (pokemon) => {
  
  if ((window.team.length < 6) && (!window.team.includes(pokemon))){
    window.team.push(pokemon);
    localStorage.setItem('teamArray', JSON.stringify(window.team));
    handleConfirmationAlert('Pokemon Added');
  } else if (window.team.length < 6){
    handleErrorAlert('Error', 'You already have that pokemon on you team')
  } else {
    handleErrorAlert('Your team is full', 'Your team can only have 6 pokemons')
  }
};

const deleteMember = (pokemon) => {

  const index = window.team.indexOf(pokemon);
  if (index !== -1){
    window.team.splice(index, 1);
    localStorage.setItem('teamArray', JSON.stringify(window.team));
    handleConfirmationAlert('Your pokemon has been deleted succesfully', 'Please refresh window to see changes');
  }
};

const deleteTeam = () => {

  window.team = []
  localStorage.setItem('teamArray', JSON.stringify(window.team));
  handleConfirmationAlert('Your team has been deleted succesfully', 'Please refresh window to see changes');
};

const handleConfirmationAlert = (text,littleText) => {
  Swal.fire({
    title: text,
    text:littleText,
    icon: 'succes',
    confirmButtonText: 'Ok',
  });
};

const handleErrorAlert = (text, littleText) => {
  Swal.fire({
    title: text,
    text: littleText,
    icon: 'error',
    confirmButtonText: 'Ok',
  });
};



function App() {
  
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonsPerPage = 20;

  const fetchPokemons = async (limit, offset) => {
    try {
      setLoading(true)
      const data = await getPokemons(limit, offset);
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url);
      });
      const results = await Promise.all(promises);
      setPokemons(results);
      setLoading(false)
    } catch (err) {setLoading(false);}
  };

  const saveArrayToLocalStorage = () => {
    localStorage.setItem('teamArray', JSON.stringify(window.team));
  };
  

  useEffect(() => {
    const offset = (currentPage - 1) * pokemonsPerPage;
    fetchPokemons(pokemonsPerPage, offset);
    window.team = JSON.parse(localStorage.getItem('teamArray'));
  }, [currentPage]);

  const changePage = (direction) => {
    if (direction == "next"){
      setCurrentPage(currentPage + 1)
    } else if (currentPage > 1){
      setCurrentPage(currentPage - 1)
    }
  }

  return (


    <div className="bg-pokedex bg-repeat w-full h-full p-10 min-h-screen flex items-center justify-center">
    {loading ? (
      <div className="w-1/12 text-center">
        <div className="bg-loading bg-contain bg-no-repeat min-h-screen content-center bg-center animate-spin align-middle"></div>
      </div>
    ) : (
      <div>
        
        <Pokedex pokemons={pokemons} selectedPokemon={selectedPokemon} setSelectedPokemon={setSelectedPokemon} />
        <div className="grid grid-cols-12 mt-8">   
        <button
            className="font-heywow font-semibold col-span-4 lg:col-span-1 bg-gray-300 hover:bg-gray-400 focus:ring-2 rounded-sm p-4 hover:bg-gray-400 bg-gray-200 text-gray-600 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110`"
            onClick={() => changePage("prev")}>PREV</button> 

         <button
            className="font-heywow font-semibold col-span-4 lg:col-span-1 bg-gray-300 hover:bg-gray-400 focus:ring-2 rounded-sm p-4 hover:bg-gray-400 bg-gray-200 col-start-9 lg:col-start-12 text-gray-600 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110`"
            onClick={() => changePage("next")}>NEXT</button>         
        </div>
        
      </div>
    )}
    </div>


  )
}

export default App;
export {addTeam, deleteMember, deleteTeam};
