import logo from './logo.svg';
import './App.css';
import Pokedex from './components/pokedex';
import { getPokemonData, getPokemons } from './api';
import {useState, useEffect} from 'react';
import Message from './components/message';
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

  const fetchPokemons = async () => {
    try {
      const data = await getPokemons();
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url);
      });
      const results = await Promise.all(promises);
      setPokemons(results);
    } catch (err) {}
  };

  const saveArrayToLocalStorage = () => {
    localStorage.setItem('teamArray', JSON.stringify(window.team));
  };
  

  useEffect(() => {
    fetchPokemons();
    window.team = JSON.parse(localStorage.getItem('teamArray'));
  }, []);

  return (
    <div className="bg-pokedex bg-auto bg-repeat pb-10">
      <Pokedex pokemons={pokemons} selectedPokemon={selectedPokemon} setSelectedPokemon={setSelectedPokemon} />
    </div>
  )
}

export default App;
export {addTeam, deleteMember,deleteTeam};
