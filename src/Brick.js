import React from 'react';
import * as utility from './utility.js';

const colorPalette = [
    'transparent',
    'rgba(240, 240, 240)',
    'rgba(224, 224, 224)',
    'rgba(208, 208, 208)',
    'rgba(192, 192, 192)',
    'rgba(176, 176, 176)',
    'rgba(160, 160, 160)',
    'rgba(144, 144, 144)',
    'rgba(128, 128, 128)',
    'rgba(112, 112, 112)',
    'rgba(96, 96, 96)',
    'rgba(80, 80, 80)',
    'rgba(64, 64, 64)',
    'rgba(48, 48, 48)',
    'rgba(32, 32, 32)',
    'rgba(16, 16, 16)',
    'rgba(0, 0, 0)'
];
 
const grayCode = (() => {
    var ret = [];
    let it = 0;
    for (let i = 0;i < 16; i++) {
        it ^= (i&-i);
        ret.push(it);
    }
    return ret;
})();

class Brick extends React.Component {
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
                fontSize: '3vw',
                border: '0vw',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                fontFamily: 'TimesNewRoman',
            },
            value: this.props.value
        };
        this.initialPosition = this.initialPosition.bind(this);
        this.romanNumeral = this.romanNumeral.bind(this);
        this.updateStyles = this.updateStyles.bind(this);
        this.moveToNewPlace = this.moveToNewPlace.bind(this);
    }
    componentDidMount() {
        this.updateStyles();
    }
    componentDidUpdate (prevProps, prevState, snapshot) {
        if (prevProps.value != this.props.value || prevProps.goTo != this.props.goTo) {
            this.moveToNewPlace(this.props.goTo);
        }
    }
    moveToNewPlace (newPlace) {
        console.log(`Brick ${this.state.brickId} prepare to move to ${newPlace}`);
        const [i, j] = [
            Number(this.initialPosition(newPlace)[0].slice(0, -2)),
            Number(this.initialPosition(newPlace)[1].slice(0, -2))
        ];
        const [oi, oj] = [
            Number(this.state.styles.top.slice(0, -2)), 
            Number(this.state.styles.left.slice(0, -2))
        ];
        var t_styles = JSON.parse(JSON.stringify(this.state.styles));
        let id = null, pos = 0;
        const animationFunction = utility.createAnimationFunction();
        clearInterval(id);
        id = setInterval((() => {
            if (pos == 50) {
                clearInterval(id);
                this.updateStyles();
            } else {
                console.log('in frame', pos);
                t_styles.top = animationFunction(oi, i, pos/50)+'vw'; 
                t_styles.left = animationFunction(oj, j, pos/50)+'vw';
                t_styles.color = (pos > 45 ? 'transparent' : t_styles.color);
                this.setState({
                    styles: JSON.parse(JSON.stringify(t_styles))
                });
                pos++;
            }
        }).bind(this), 1);
    }
    updateStyles() {
        var t_styles = JSON.parse(JSON.stringify(this.state.styles));
        const colorId = (grayCode[this.props.value-1]+7)%16+1;
        t_styles.background = colorPalette[(grayCode[this.props.value-1]+7)%16+1];
        [t_styles.top, t_styles.left] = this.initialPosition(this.state.brickId);
        t_styles.color = (colorId > 12 ? 'white' : 'black');
        if (this.props.value > 10) {
            t_styles.border = '0.2vw solid white';
            t_styles.width = '5.8vw';
            t_styles.height = '5.8vw';
        } else {
            t_styles.border = '0vw';
            t_styles.width = '6vw';
            t_styles.height = '6vw';
        } 
        this.setState({
            styles: t_styles,
            value: this.props.value
        });
    }
    initialPosition (brickId) {
        const i = Math.floor(brickId/4), j = brickId%4;
        return [`${i*7.5+0.75}vw`, `${j*7.5+0.75}vw`];
    }
    romanNumeral () {
        const num = this.state.value;
        if (num === 0) return '';
        var digits = String(+num).split(""),
            key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
               "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
               "","I","II","III","IV","V","VI","VII","VIII","IX"],
            roman = "",
            i = 3;
        while (i--)
            roman = (key[+digits.pop() + (i * 10)] || "") + roman;
        return Array(+digits.join("") + 1).join("M") + roman;
    }
    render() {
        return (
            <div style={this.state.styles}>
                <p>{this.romanNumeral()}</p>
            </div>
        );
    }
}

export default Brick;
