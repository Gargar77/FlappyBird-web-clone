import './Obstacle.css';
import React, {Component} from 'react';
import {connect} from 'react-redux';
class Obstacle extends Component {
    constructor(props) {
        super(props)
        this._isMounted = false
        this.interval = null;
    }
    state = {
        rightPos:-20
    }

    componentDidMount() {
        this._isMounted = true;
        this.interval = setInterval(()=> {
            if (this.state.rightPos <= 110 && this.props.gameState.started) {
                this.moveObstacle();
            }
        },50)
    }

    componentWillUnmount() {
        this._isMounted = false;
        clearInterval(this.interval);
    }

    moveObstacle = () => {
        const newRightPos = this.state.rightPos + 1;
        requestAnimationFrame(()=> {
            this.setState({
                ...this.state,
                rightPos: newRightPos
            })
        })
    }

    getOrientation() {
        if (this.props.flipped) {
            return {top:0}
        } else {
            return {bottom:0}
        }
    }

    getNewPos() {
        return {right: `${this.state.rightPos}%`}
    }

    getRandomHeight() {
        return {height:`${this.props.height}px`};
    }
   

    render() {
        const randHeight = this.getRandomHeight();
        const orientation = this.getOrientation();
        const currentRightPos= this.getNewPos();
        const activeStyle = {
            ...orientation,
            ...currentRightPos,
            ...randHeight
        }
        
        return (
            <div 
                className="obstacle"
                style={activeStyle}
                    ></div>
        )
    }
}

const mapStateToProps = state => {
    return {
        gameState: state
    }
}


export default connect(mapStateToProps)(Obstacle);