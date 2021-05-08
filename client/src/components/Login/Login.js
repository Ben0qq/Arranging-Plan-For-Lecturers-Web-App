import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import './Login.css';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { 
    requestLogin,
    getStatus
    } from './loginSlice';
import React, { useState } from 'react';


export function Login() {
    const dispatch = useDispatch();
    const status = useSelector(getStatus)
    const [loginData, setLoginData] = useState({
        login: '',
        password: '',
    })

    const handleChange = (prop) => (event) => {
        setLoginData({ ...loginData, [prop]: event.target.value })
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
                style={{ margin: "10px" }}
                placeholder="Password"
                inputProps={{ 'aria-label': 'password field' }}
                onChange={handleChange('password')}
            />
            <Button variant="contained" color="primary" onClick={() => dispatch(requestLogin(loginData))}>
                {status ==='idle'?'Log in':<CircularProgress size={30} color='secondary'/>}
            </Button>
        </div>
    );
}