import logo from 'import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather Dashboard</h1>
        <div style={{ padding: '20px', border: '1px solid white', borderRadius: '10px', marginTop: '20px' }}>
          <h2>Pune, MH</h2>
          <p>Temperature: 28°C</p>
          <p>Condition: Partly Cloudy</p>
          <p>Humidity: 60%</p>
        </div>
      </header>
    </div>
  );
}

export default App;
