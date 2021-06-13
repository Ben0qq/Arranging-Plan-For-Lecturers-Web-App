import './App.css';
import { Login } from './components/Login/Login';
import { useSelector, useDispatch } from 'react-redux';
import {
  getAppState,
  getAlertType,
  setAlertOpen,
  getAlertText,
  getAlertOpen,
  getLoginResponse
} from './components/Login/loginSlice';
import { Calendar } from './components/Calendar/Calendar';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { AdminPanel } from './components/AdminPanel/AdminPanel';

function App() {
  const appState = useSelector(getAppState);
  const alertType = useSelector(getAlertType);
  const alertText = useSelector(getAlertText);
  const alertOpen = useSelector(getAlertOpen);
  const loginResponse = useSelector(getLoginResponse)
  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setAlertOpen(false))
  };

  if (appState === 'login') {
    return (
      <div className="divLogin">
        <h2>
          Super aplikacja dla prowadzących (nazwa mniej robocza)
          </h2>
        <Login />
        <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={alertType === "success" ? "success" : "error"}>
            {alertText}
          </Alert>
        </Snackbar>
      </div>
    );
  } else {
    if (loginResponse.data.user.role === 'admin') {
      return (
        <div className="divCalendar">
          <AdminPanel />
          <Calendar />
          <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={alertType === "success" ? "success" : "error"}>
              {alertText}
            </Alert>
          </Snackbar>
        </div>
      )
    } else {
      console.log(loginResponse)
      return (
        <div className="divCalendar">
          <Calendar />
          <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={alertType === "success" ? "success" : "error"}>
              {alertText}
            </Alert>
          </Snackbar>
        </div>
      )
    }
  }
}

export default App;