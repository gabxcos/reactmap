import React, { Component } from 'react';
import './App.css';

import Menu from './components/Menu'
import Map from './components/Map'

class App extends Component {
  render() {
    return (
      <main className="App">
				<Menu/>
        <Map/>
      </main>
    );
  }
}

export default App;
