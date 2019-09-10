import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import './css/App.css';
import './css/grails.css';
import './css/main.css';
import AppProviders from "./AppProviders";
import RegisterConfirm from "./RegisterConfirm";
import Route from "react-router-dom/es/Route";
import Router from "react-router-dom/es/Router";

ReactDOM.render(<AppProviders><App /></AppProviders>, document.getElementById('root'));
// ReactDOM.render(<App />, document.getElementById('root'));