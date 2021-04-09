import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/login';

function App() {
  const [setResponse] = useState({})

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
        <h2>
          Super aplikacja dla prowadzących (nazwa robocza)
        </h2>
      <Login/>
    </div>
  );
}

export default App;