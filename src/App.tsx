import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Navigation from './views/Navigation';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation/>
      </BrowserRouter>
    </div>
  );
}

export default App;