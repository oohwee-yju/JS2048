import React from 'react';

class BrickShadow extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            brickId: this.props.brickId,
            styles: {
                position: 'absolute',
                display: 'flex',
                margin: 'auto',
                borderRadius: '10%',
                width: '6vw',
                height: '6vw',
                top: this.initialPosition(this.props.brickId)[0],
                left: this.initialPosition(this.props.brickId)[1],
                color: 'black',
                boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px'
            }
        };
        this.initialPosition = this.initialPosition.bind(this);
    }
    initialPosition (brickId) {
        const i = Math.floor(brickId/4), j = brickId%4;
        return [`${i*7.5+0.75}vw`, `${j*7.5+0.75}vw`];
    }
    render() {
        return (
            <div style={this.state.styles}>
            </div>
        );
    }
}

export default BrickShadow;
