import React, { useState } from 'react';
import './App.css';
import Home from './ventanaInicial/home.jsx';
import Reservation from './Reservation.jsx';

function App() {
  const [currentView, setCurrentView] = useState('home');

  return (
    <div className="app-container">
      {currentView === 'home' ? (
        <Home onNavigateToReservation={() => setCurrentView('reservation')} />
      ) : (
        <Reservation onBackToHome={() => setCurrentView('home')} />
      )}
    </div>
  );
}

export default App;