import React from 'react';
import logo from './logo.svg';
import './App.css';
import DiseaseDashboard from './diseaseDashboard/DiseaseDashboard';

function App() {
  return (
    <div className="App">
      <header className="header">
      <h1>Disease Information Dashboard</h1>
      <DiseaseDashboard />
      </header>
    </div>
  );
}

export default App;
