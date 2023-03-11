import React from 'react';
import './App.css';
import MainPage from './MainPage';
import GamePage from './GamePage';

class App extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            page: 'GamePage',
        };
    }
    render() {
        if (this.state.page === 'MainPage') {
            return (
                <div>
                    <MainPage />
                </div>
            );
        } else if (this.state.page === 'GamePage') {
            return (
                <div >
                    <div className="area">
                        <ul className="circles">
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                        </ul>
                    </div >
                    <GamePage />
                </div>
            );
        }
        return (
            <div>
                <p>Page does not exist.</p>
            </div>
        );
    }
}

export default App;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
