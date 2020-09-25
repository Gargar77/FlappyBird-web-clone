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
      return;
    }
  }

  addObstacle() {
    const currentObstacles = [...this.state.obstacles]    
    const heights = this.getsafeObstacleHeights();

    const obstacle = <Obstacle 
                        key={Math.random().toString(36).substring(2, 15)}
                        height={heights[0]}/>
    const obstacleFlipped = <Obstacle flipped 
                        key={Math.random().toString(36).substring(2, 15)}
                        height={heights[1]}/>

    currentObstacles.push(obstacle,obstacleFlipped)
    this.setState({
      ...this.state,
      obstacles: currentObstacles
    })
  }

  getsafeObstacleHeights() {
    let heightsAreSafe = false
    let randHeight1,randHeight2;
    while (!heightsAreSafe) {
  // height diff must be greater than 35 to be safe to traverse
       randHeight1 = getRandomInt(160,300);
       randHeight2 = getRandomInt(160,300);

      if ((Math.abs(randHeight1 - randHeight2)) > 50) {
        heightsAreSafe = true;
      }
    }

    return [randHeight1,randHeight2];
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
