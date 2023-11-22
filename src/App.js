import './App.css';
import Pokedex from './components/pokedex';
import { getPokemonData, getPokemons } from './api';
import {useState, useEffect} from 'react';
import Swal from 'sweetalert2';

window.team = [];

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
    icon: 'success',
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
  return (
    <div>     
        <Pokedex/>
    </div>
  )
}

export default App;
export { deleteMember, deleteTeam, handleErrorAlert, handleConfirmationAlert };
