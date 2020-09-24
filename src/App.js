import React from 'react';
import './App.css';
import Obstacle from './components/Obstacle/Obstacle';

function App() {
  return (
   <div className="game-container">
     <div className="sky">
     <Obstacle/>
     </div>
     <div className="ground"></div>
   </div>
  );
}

export default App;
