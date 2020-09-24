import './Obstacle.css';
import React, {Component} from 'react';


class Obstacle extends Component {

    getOrientation() {
        if (this.props.flipped) {
            return {top:"0"}
        } else {
            return {bottom:"0"}
        }
    }
   

    render() {
        const orientation = this.getOrientation();
        return (
            <div 
                className="obstacle"
                style={orientation}
                    ></div>
        )
    }
}


export default Obstacle;