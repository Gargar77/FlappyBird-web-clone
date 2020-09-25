import React, { Component } from 'react';
import './App.css';
import Obstacle from './components/Obstacle/Obstacle';
import {connect} from 'react-redux';
import {getRandomInt} from './utils/math';

class App extends Component {
  constructor(props) {
    super(props)
    this._isMounted = false
    this.intervals = []
  }
  state= {
    obstacles:[],
    maxViewableObstacles: 6,
    intervals: []
  }

  componentDidMount() {
      this._isMounted = true
      if (this.props.gameState.started && this._isMounted) {
        this.intervals.push(
              setInterval(()=> {
            this.addObstacle();
            console.log("checking")
          },2000));

          this.intervals.push(
            setInterval(()=> {
          this.removeObstaclePair();
          console.log("removing")
        },3000));
      }
  }

  componentWillUnmount() {
    this.isMounted = false;
    for (let i = 0; i < this.state.intervals.lenght;i++) {
      clearInterval(this.state.intervals[i]);
    }
  }



  hasMaxObstacles() {
    const obstaclesInGame = this.state.obstacles.length;
    const maxObstaclesAllowed = this.state.maxViewableObstacles
    return obstaclesInGame > maxObstaclesAllowed ? true : false;
  }

  addObstacle() {
    if (this.hasMaxObstacles()) return;
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

  removeObstaclePair = () => {
    if (!this.hasMaxObstacles()) return;
    let currentObstacles = [...this.state.obstacles];
    console.log("before:",currentObstacles)
    currentObstacles.shift();
    currentObstacles.shift();
    console.log("after:",currentObstacles)


    this.setState ({
      ...this.state,
      obstacles:currentObstacles
    })
  }

  getsafeObstacleHeights() {
    let heightsAreSafe = false
    let randHeight1,randHeight2;
    while (!heightsAreSafe) {
  // height diff must be greater than 35 to be safe to traverse
       randHeight1 = getRandomInt(160,280);
       randHeight2 = getRandomInt(160,280);

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
