import './App.css';
import Login from './components/Login';
import { connect } from 'react-redux';
import { getAppState } from './selectors/selectors';

const App = ({appState}) => {
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

const mapStateToProps = state => {
  const appState = getAppState(state)
  return {appState};
}

export default connect(mapStateToProps)(App);