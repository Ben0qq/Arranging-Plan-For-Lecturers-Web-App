import './App.css';
import {Login} from './components/Login';
import { useSelector } from 'react-redux';
import { getAppState } from './components/loginSlice';

function App() {
  const appState = useSelector(getAppState);
  if(appState ==='login'){
    return (
      <div className="App">
          <h2>
            Super aplikacja dla prowadzących (nazwa robocza)
          </h2>
        <Login/>
      </div>
    );
  } else {
    return(
      <div className="App">
            <h2>
              Tu będą zapisywać się na zajęcia
            </h2>
        </div>
    )
  }
}

export default App;