import React, { Component } from 'react';
import './App.css';
import Obstacle from './components/Obstacle/Obstacle';
import {connect} from 'react-redux';

class App extends Component {

  state= {
    obstacles:[]
  }

  componentDidMount() {
    setInterval(()=> {
      this.checkObstacles();
    },1000)
  }

  checkObstacles = () => {
    if (!this.props.globalState)  return;
    if (this.state.obstacles.length === 0) {
      this.addObstacle();
    }
  }

  addObstacle() {
    console.log("adding")
    let currentObstacles = [...this.state.obstacles]
    const obstacle = <Obstacle key={Math.random().toString(36).substring(2, 15)}/>
    currentObstacles.push(obstacle)
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
    globalState:state
  }
}

export default connect(mapStateToProps)(App);
