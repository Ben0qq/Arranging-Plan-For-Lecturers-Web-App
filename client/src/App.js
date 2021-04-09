import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [responseFromApi] = useState({})

  const fetchData = async() => {
    fetch('/api/hello')
      .then(res => res.json())
      .then(res => {
        setResponse(res)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <a style={{ fontSize: 24 }}>
        Msg from API: <span style={{ color: 'red' }}>{responseFromApi.header}</span>
        </a>
      </header>
    </div>
  );
}

export default App;