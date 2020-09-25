import React from 'react';
import './App.css';
import ObstacleGenerator from './containers/ObstacleGenerator/ObstacleGenerator';
const App = () => {
    return (
      <div className="game-container">
        <div className="sky">
       <ObstacleGenerator/>
        </div>
        <div className="ground"></div>
      </div>
     );
}


export default App;
