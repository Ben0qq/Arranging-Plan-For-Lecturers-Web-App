import './App.css';
import {Login} from './components/Login/Login';
import { useSelector } from 'react-redux';
import { getAppState } from './components/Login/loginSlice';
import {Calendar} from './components/Calendar/Calendar';

function App() {
  const appState = useSelector(getAppState);
  if(appState ==='login'){
    return (
      <div className="divLogin">
          <h2>
            Super aplikacja dla prowadzących (nazwa robocza)
          </h2>
        <Login/>
      </div>
    );
  } else {
    return(
      <div className="divCalendar">
            <Calendar></Calendar>
      </div>
    )
  }
}

export default App;