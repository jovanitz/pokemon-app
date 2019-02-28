import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// if you want to change id, you need change in webpack.config HtmlWebPackPlugin too.
ReactDOM.render(<App />, document.getElementById('index'));
