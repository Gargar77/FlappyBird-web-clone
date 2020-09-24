import React, { Component } from 'react';
import './App.css';
import Obstacle from './components/Obstacle/Obstacle';
import {connect} from 'react-redux';
import {getRandomInt} from './utils/math';

class App extends Component {

  state= {
    obstacles:[]
  }

  componentDidMount() {
      if (this.props.gameState.started) {
        setInterval(()=> {
        this.checkObstacles();
      },1000)
    }
  }

  checkObstacles = () => {
    if (!this.props.gameState.started)  return;
    if (this.state.obstacles.length === 0) {
      this.addObstacle();
    }
  }

  addObstacle() {
    let currentObstacles = [...this.state.obstacles]
    const obstacle = <Obstacle 
                        key={Math.random().toString(36).substring(2, 15)}
                        height={getRandomInt(100,280)}/>
    const obstacleFlipped = <Obstacle flipped 
                        key={Math.random().toString(36).substring(2, 15)}
                        height={getRandomInt(100,280)}/>
    currentObstacles.push(obstacle,obstacleFlipped)
    this.setState({
      ...this.state,
      obstacles: currentObstacles
    })
  }

  render() {
    let obstacles = this.state.obstacles;
    return (
      <div className="game-container">
        <div className="sky">
        {obstacles}
        </div>
        <div className="ground"></div>
      </div>
     );
  }
  
}

const mapStateToProps = state => {
  return {
    gameState:state
  }
}

export default connect(mapStateToProps)(App);
