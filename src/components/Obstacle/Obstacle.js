import './Obstacle.css';
import React, {Component} from 'react';
import {connect} from 'react-redux';

class Obstacle extends Component {

    state = {
        rightPos:-20
    }

    componentDidMount() {
        setInterval(()=> {
            if (this.state.rightPos <= 110) {
                this.moveObstacle();
            }
        },50)
    //    console.log(this.props.globalState);
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
   

    render() {
        const orientation = this.getOrientation();
        const currentRightPos= this.getNewPos();

        const activeStyle = {
            ...orientation,
            ...currentRightPos
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
        globalState: state
    }
}


export default connect(mapStateToProps)(Obstacle);