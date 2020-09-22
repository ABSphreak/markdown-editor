import React, { useEffect } from 'react';
import './App.css';
const { ipcRenderer } = window.require('electron');

function App() {
  useEffect(() => {
    ipcRenderer.on('new-file', (event, fileContent) => {
      console.log(fileContent);
    });
  }, []);

  return (
    <div className="App">
      <h1>Hello from Electron</h1>
    </div>
  );
}

export default App;
