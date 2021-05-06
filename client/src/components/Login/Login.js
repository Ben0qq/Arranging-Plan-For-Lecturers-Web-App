import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import './Login.css';
import { useDispatch } from 'react-redux';
import { requestLogin } from './loginSlice';
import React, {useState} from 'react';

export function Login() {
    const dispatch = useDispatch();
    const [loginData, setLoginData] = useState({
        login: '',
        password: ''
    })

    const handleChange = (prop) => (event) => {
        setLoginData({ ...loginData, [prop]: event.target.value})
    }

    return (
        <div className="loginWorkArea">
            <Input 
                placeholder="Login" 
                inputProps={{ 'aria-label': 'login field' }}
                onChange={handleChange('login')}
                 />
            <Input 
                type='password' 
                style={{margin: "10px"}} 
                placeholder="Password" 
                inputProps={{ 'aria-label': 'password field' }}
                onChange={handleChange('password')}
                 />
            <Button variant="contained" color="primary" onClick={() => dispatch(requestLogin(loginData.login, loginData.password))}>
                Tu kiedyś będzie logowanie
            </Button>
        </div>
    );
  }