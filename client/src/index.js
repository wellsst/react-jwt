import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import './css/App.css';
import './css/grails.css';
import './css/main.css';
import AppProviders from "./AppProviders";

ReactDOM.render(<AppProviders><App /></AppProviders>, document.getElementById('root'));
