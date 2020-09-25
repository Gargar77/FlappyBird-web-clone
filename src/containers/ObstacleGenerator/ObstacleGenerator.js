import React, { Component } from 'react';
import Obstacle from '../../components/Obstacle/Obstacle';
import {getRandomInt} from '../../utils/math';
import {connect} from 'react-redux';


class ObstacleGenerator extends Component {
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
              },2800));
    
              this.intervals.push(
                setInterval(()=> {
              this.removeObstaclePair();
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
        currentObstacles.shift();
        currentObstacles.shift();
    
    
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
           randHeight1 = getRandomInt(30,500);
           randHeight2 = getRandomInt(30,500);
            
        //   if ((Math.abs(randHeight2 - randHeight1)) > 50) {
        //     heightsAreSafe = true;
        //   }
            let gapLength = (randHeight1 + randHeight2) / 2
        if (( gapLength >= 200 && gapLength < 230)) {
            heightsAreSafe = true;
        }

        }
        return [randHeight1,randHeight2];
      }


      render() {
        let obstacles = this.state.obstacles;
            return  obstacles
      }
}


const mapStateToProps = state => {
    return {
      gameState:state
    }
  }


  export default connect(mapStateToProps)(ObstacleGenerator);