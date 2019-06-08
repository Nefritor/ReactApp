import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Players from './App';
import * as serviceWorker from './serviceWorker';

const players = [{
    name: 'Marat Khamitov',
    number: '5',
    position: 'Right Forward'
}, {
    name: 'Antonie Griezmann',
    number: '10',
    position: 'Center Forward'
}, {
    name: 'Cristiano Ronaldo',
    number: '7',
    position: 'Left Forward'
}, {
    name: 'James Rodriguez',
    number: '10',
    position: 'Center Attacking Midfielder'
}];

console.log(players);

ReactDOM.render(<Players players={players} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
