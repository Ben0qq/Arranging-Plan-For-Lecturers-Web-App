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
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';

import { setDialogAddUserOpen, getDialogAddUserOpen } from '../AdminPanel/adminPanelSlice'
import { AddUser } from '../AdminPanel/AdminPanel';

const useStyles = makeStyles({
    paper: {
        backgroundColor: 'blue'
    },
    dialog: {
        padding: '10px',
        margin: '10px',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dialogDiv: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        margin: '10px',
        padding: '10px'
    },
    buttons:{
        flexDirection: 'row'
    }
});

export function Login() {
    const classes = useStyles();

    const dispatch = useDispatch();
    const status = useSelector(getStatus)
    const open = useSelector(getDialogAddUserOpen)
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
            <div className={classes.buttons}>
            <Button className={classes.button} variant="contained" color="primary" onClick={() => dispatch(requestLogin(loginData))}>
                {status === 'idle' ? 'Log in' : <CircularProgress size={30} color='secondary' />}
            </Button>
            <Button className={classes.button} variant="contained" color="primary" onClick={() => dispatch(setDialogAddUserOpen(true))}>
                Signup
            </Button>
            </div>
            <Dialog onClose={() => dispatch(setDialogAddUserOpen(false))} open={open}>
                <div className={classes.dialog}>
                    <AddUser>

                    </AddUser>
                </div>
            </Dialog>
        </div>
    );
}