import React, { Component } from 'react';
import Routes from './routes/Routes';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

// setup fake backend
import { configureFakeBackend } from './helpers';

// Themes

// default
import './assets/scss/theme.scss';

// dark
// import './assets/scss/theme-dark.scss';

// rtl
// import './assets/scss/theme-rtl.scss';


// configure fake backend
configureFakeBackend();

/**
 * Main app component
 */
class App extends Component {
  render() {
    return <Routes></Routes>
  }
}

export default App;
