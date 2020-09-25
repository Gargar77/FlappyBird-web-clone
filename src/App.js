import React from 'react';
import './App.css';
import ObstacleGenerator from './containers/ObstacleGenerator/ObstacleGenerator';
import Bird from './components/Bird/Bird';
const App = () => {
    return (
      <div className="game-container">
        <div className="sky">
       <ObstacleGenerator/>
       <Bird/>
        </div>
        <div className="ground"></div>
      </div>
     );
}


export default App;
