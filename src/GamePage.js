import React from 'react';
import GameBlock from './GameBlock';
import RestartButton from './Buttons/RestartButton';
//import TutorialButton from './Buttons/TutorialButton';
//import HomeButton from './Buttons/HomeButton';

class GamePage extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            styles: {
                position: 'absolute',
                left: 0,
                top: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '98vw',
                height: '98vh',
            },
            restartFlag: 0,
        };
        this.gameBlockRestart = this.gameBlockRestart.bind(this);
    }
    gameBlockRestart () {
        this.setState((state, props) => ({
            restartFlag: !state.restartFlag,
        }));
    }
    render() {
        return (
            <div style={this.state.styles}>
                <GameBlock restartFlag={this.state.restartFlag} restartFlagDone={this.gameBlockRestart} ifLose={this.gameBlockRestart}/>
                <RestartButton trigger={this.gameBlockRestart}/>
            </div>
        );
    }
}

export default GamePage;
