import React from 'react';
import ReservationForm from './components/ReservationForm';
import ReservationList from './components/ReservationList';
import ReservationCalendar from './components/ReservationCalendar';
import Footer from './components/Footer';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <h1>Sistema de Reserva de Espaços</h1>
      <h2>Fazer Reserva</h2>
      <ReservationForm /> 
      <ReservationCalendar />
      <ReservationList />
      <Footer/>
    </div>
  );
};

export default App;
