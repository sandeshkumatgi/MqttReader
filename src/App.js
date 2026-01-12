import React from 'react';
import './App.css';
import MqttComponent from './MqttComponent.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>MQTT React App</h1>
        <MqttComponent />
      </header>
    </div>
  );
}

export default App;
