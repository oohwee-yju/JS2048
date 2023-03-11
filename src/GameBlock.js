import React from 'react';
import Brick from './Brick';
import BrickShadow from './BrickShadow';

class GameBlock extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            grid: this.newItem((() => {
                var ret = Array(16);
                for (let i = 0;i < ret.length; i++) ret[i] = 0;
                return ret;
            })()), 
            goTo: (() => {
                var ret = Array(16);
                for (let i = 0;i < ret.length; i++) ret[i] = i;
                return ret;
            })(),
            styles: {
                position: 'absolute',
                width: '30vw',
                height: '30vw',
                display: 'flex',
            },
            score: 0,
        }
        this.isHandleKeyPress = 0;
        this.newItem = this.newItem.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.checkIfLose = this.checkIfLose.bind(this);
    }
    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyPress);
    }
    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyPress);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.restartFlag != this.props.restartFlag) {
            if (this.props.restartFlag) {
                this.restartGame();
            }
        }
    }
    restartGame () {
        this.setState({
            grid: this.newItem((() => {
                var ret = Array(16);
                for (let i = 0;i < ret.length; i++) ret[i] = 0;
                return ret;
            })()), 
            styles: {
                position: 'absolute',
                width: '30vw',
                height: '30vw',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            },
            goTo: (() => {
                var ret = Array(16);
                for (let i = 0;i < ret.length; i++) ret[i] = i;
                return ret;
            })(),
            score: 0,
        });
        this.props.restartFlagDone();
    }
    checkIfLose () {
        const eachGrid = [
            this.handleKeyLeft(this.state.grid)[0], 
            this.handleKeyRight(this.state.grid)[0],
            this.handleKeyUp(this.state.grid)[0],
            this.handleKeyDown(this.state.grid)[0]
        ];
        for (let i = 0;i < 16; i++) {
            for (let j = 0;j < 4; j++) {
                if (eachGrid[j][i] !== this.state.grid[i]) return false;
            }
        }
        return true;
    }
    newItem (theGrid) {
        var t_grid = Array.from(theGrid);
        var pos = [];
        for (let i = 0;i < t_grid.length; i++) {
            if (t_grid[i] === 0) pos.push(i);
        }
        var idx = Math.floor(Math.random()*(pos.length));
        if (Math.random() < 0.1) {
            t_grid[pos[idx]] = 2;
        } else {
            t_grid[pos[idx]] = 1;
        }
        return t_grid;
    }
    handleKeyLeft() {
        var t_grid = Array.from(this.state.grid);
        var to_grid = [];
        var merged = [];
        for (let i = 0;i < 4; i++) {
            for (let j = 0;j < 4; j++) {
                if (t_grid[i*4+j] === 0) {
                    to_grid[i*4+j] = i*4+j;
                    continue;
                }
                var k = j-1;
                while (k >= 0 && t_grid[i*4+k] === 0) k--;
                if (k >= 0 && t_grid[i*4+k] === t_grid[i*4+j] && !merged[i*4+k]) {
                    t_grid[i*4+j] = 0;
                    t_grid[i*4+k]++;
                    merged[i*4+k] = 1;
                    to_grid[i*4+j] = i*4+k;
                } else {
                    t_grid[i*4+k+1] = t_grid[i*4+j];
                    if (k+1 !== j) t_grid[i*4+j] = 0;
                    to_grid[i*4+j] = i*4+k+1;
                }
            }
        }
        return [t_grid, to_grid];
    }
    handleKeyRight() {
        var t_grid = Array.from(this.state.grid);
        var to_grid = [];
        var merged = [];
        for (let i = 0;i < 4; i++) {
            for (let j = 3;j >= 0; j--) {
                if (t_grid[i*4+j] === 0) {
                    to_grid[i*4+j] = i*4+j;
                    continue;
                }
                var k = j+1;
                while (k < 4 && t_grid[i*4+k] === 0) k++;
                if (k < 4 && t_grid[i*4+k] === t_grid[i*4+j] && !merged[i*4+k]) {
                    t_grid[i*4+j] = 0;
                    t_grid[i*4+k]++;
                    merged[i*4+k] = 1;
                    to_grid[i*4+j] = i*4+k;
                } else {
                    t_grid[i*4+k-1] = t_grid[i*4+j];
                    if (k-1 !== j) t_grid[i*4+j] = 0;
                    to_grid[i*4+j] = i*4+k-1;
                }
            }
        }
        return [t_grid, to_grid];

    }
    handleKeyUp() {
        var t_grid = Array.from(this.state.grid);
        var to_grid = [];
        var merged = [];
        for (let i = 0;i < 4; i++) {
            for (let j = 0;j < 4; j++) {
                if (t_grid[i*4+j] === 0) {
                    to_grid[i*4+j] = i*4+j;
                    continue;
                }
                var k = i-1;
                while (k >= 0 && t_grid[k*4+j] === 0) k--;
                if (k >= 0 && t_grid[k*4+j] === t_grid[i*4+j] && !merged[k*4+j]) {
                    t_grid[i*4+j] = 0;
                    t_grid[k*4+j]++;
                    merged[k*4+j] = 1;
                    to_grid[i*4+j] = k*4+j;
                } else {
                    t_grid[(k+1)*4+j] = t_grid[i*4+j];
                    if (k+1 !== i) t_grid[i*4+j] = 0;
                    to_grid[i*4+j] = (k+1)*4+j;
                }
            }
        }
        return [t_grid, to_grid];
    }
    handleKeyDown() {
        var t_grid = Array.from(this.state.grid);
        var to_grid = [];
        var merged = [];
        for (let i = 3;i >= 0; i--) {
            for (let j = 0;j < 4; j++) {
                if (t_grid[i*4+j] === 0) {
                    to_grid[i*4+j] = i*4+j;
                    continue;
                }
                var k = i+1;
                while (k < 4 && t_grid[k*4+j] === 0) k++;
                if (k < 4 && t_grid[k*4+j] === t_grid[i*4+j] && !merged[k*4+j]) {
                    t_grid[i*4+j] = 0;
                    t_grid[k*4+j]++;
                    merged[k*4+j] = 1;
                    to_grid[i*4+j] = k*4+j;
                } else {
                    t_grid[(k-1)*4+j] = t_grid[i*4+j];
                    if (k-1 !== i) t_grid[i*4+j] = 0;
                    to_grid[i*4+j] = (k-1)*4+j;
                }
            }
        }
        return [t_grid, to_grid];
    }
    handleKeyPress(event) {
        if (this.isHandleKeyPress) return ;
        this.isHandleKeyPress = 1;
        setTimeout(() => {
            this.isHandleKeyPress = 0;
        }, 200);
        if (event.keyCode > 40 || event.keyCode < 37) return ;
        var [updatedGrid, newToGrid] = (() => {
            if (event.keyCode === 37) {
                return this.handleKeyLeft();
            } else if (event.keyCode === 38) {
                return this.handleKeyUp();
            } else if (event.keyCode === 39) {
                return this.handleKeyRight();
            } else if (event.keyCode === 40) {
                return this.handleKeyDown();
            }
        })();
        console.log(newToGrid);
        const flag = (() => {
            for (let i = 0;i < 16; i++) {
                if (updatedGrid[i] != this.state.grid[i]) return true;
            }
            return false;
        })();
        if (flag) {
            updatedGrid = this.newItem(updatedGrid);
            this.setState({
                grid: updatedGrid,
                goTo: newToGrid
            });
        }
        if (this.checkIfLose()) {
            this.props.ifLose();
        }
    }
    render() {
        return (
            <div style={this.state.styles}>
                <Brick value={this.state.grid[0]} brickId={0}   goTo={this.state.goTo[0]}/>
                <Brick value={this.state.grid[1]} brickId={1}   goTo={this.state.goTo[1]}/>
                <Brick value={this.state.grid[2]} brickId={2}   goTo={this.state.goTo[2]}/>
                <Brick value={this.state.grid[3]} brickId={3}   goTo={this.state.goTo[3]}/>
                <Brick value={this.state.grid[4]} brickId={4}   goTo={this.state.goTo[4]}/>
                <Brick value={this.state.grid[5]} brickId={5}   goTo={this.state.goTo[5]}/>
                <Brick value={this.state.grid[6]} brickId={6}   goTo={this.state.goTo[6]}/>
                <Brick value={this.state.grid[7]} brickId={7}   goTo={this.state.goTo[7]}/>
                <Brick value={this.state.grid[8]} brickId={8}   goTo={this.state.goTo[8]}/>
                <Brick value={this.state.grid[9]} brickId={9}   goTo={this.state.goTo[9]}/>
                <Brick value={this.state.grid[10]} brickId={10} goTo={this.state.goTo[10]}/>
                <Brick value={this.state.grid[11]} brickId={11} goTo={this.state.goTo[11]}/>
                <Brick value={this.state.grid[12]} brickId={12} goTo={this.state.goTo[12]}/>
                <Brick value={this.state.grid[13]} brickId={13} goTo={this.state.goTo[13]}/>
                <Brick value={this.state.grid[14]} brickId={14} goTo={this.state.goTo[14]}/>
                <Brick value={this.state.grid[15]} brickId={15} goTo={this.state.goTo[15]}/>

                <BrickShadow brickId={0}/>
                <BrickShadow brickId={1}/>
                <BrickShadow brickId={2}/>
                <BrickShadow brickId={3}/>
                <BrickShadow brickId={4}/>
                <BrickShadow brickId={5}/>
                <BrickShadow brickId={6}/>
                <BrickShadow brickId={7}/>
                <BrickShadow brickId={8}/>
                <BrickShadow brickId={9}/>
                <BrickShadow brickId={10}/>
                <BrickShadow brickId={11}/>
                <BrickShadow brickId={12}/>
                <BrickShadow brickId={13}/>
                <BrickShadow brickId={14}/>
                <BrickShadow brickId={15}/>
            </div>
        );
    }
}

export default GameBlock;
