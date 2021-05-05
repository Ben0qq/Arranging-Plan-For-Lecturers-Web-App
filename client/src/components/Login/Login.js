import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import './Login.css';
import { useDispatch } from 'react-redux';
import { setAppState } from './loginSlice';

export function Login() {
    const dispatch = useDispatch();
    return (
        <div className="loginWorkArea">
            <Input placeholder="Login" inputProps={{ 'aria-label': 'login field' }} />
            <Input style={{margin: "10px"}} placeholder="Password" inputProps={{ 'aria-label': 'password field' }} />
            <Button variant="contained" color="primary" onClick={() => dispatch(setAppState("plan"))}>
                Tu kiedyś będzie logowanie
            </Button>
        </div>
    );
  }