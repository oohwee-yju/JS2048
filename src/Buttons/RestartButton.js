import React from 'react';

class RestartButton extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            styles: {
                position: 'relative',
                borderRadius: '10%',
                left: '12.75vw',
                bottom: '17vw',
                height: '3vw',
                width: '3vw',
                background: 'rgba(50, 50, 50)',
            },
            counter: 0
        };
        this.ref = React.createRef();
        this.onClick = this.onClick.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
    }
    componentDidMount() {
        this.ref.current.addEventListener('click', this.onClick);
        this.ref.current.addEventListener('mouseenter', this.onMouseEnter);
        this.ref.current.addEventListener('mouseleave', this.onMouseLeave);
    }
    componentWillUnmount() {
        this.ref.current.removeEventListener('click', this.onClick);
        this.ref.current.removeEventListener('mouseenter', this.onMouseEnter);
        this.ref.current.removeEventListener('mouseleave', this.onMouseLeave);
    }
    onClick() {
        this.props.trigger();
    }
    onMouseEnter (event) {
        var t_styles = JSON.parse(JSON.stringify(this.state.styles));
        t_styles.background = 'rgba(100, 100, 100)';
        this.setState({
            styles: t_styles
        });
    }
    onMouseLeave (event) {
        var t_styles = JSON.parse(JSON.stringify(this.state.styles));
        t_styles.background = 'rgba(50, 50, 50)';
        this.setState({
            styles: t_styles
        });
    }
    render() {
        return (
            <div style={this.state.styles} ref={this.ref}>
                <p>{this.state.counter}</p>
            </div>
        );
    }
}

export default RestartButton;
