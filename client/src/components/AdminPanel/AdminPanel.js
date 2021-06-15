import './AdminPanel.css';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button'
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { getLoginResponse } from '../Login/loginSlice';
import Dialog from '@material-ui/core/Dialog';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

import {
    requestAllUsers,
    getUsers,
    getUsersChanged,
    setDialogUsersOpen,
    getDialogUsersOpen,
    setDialogAddUserOpen,
    getDialogAddUserOpen,
    addUser,
    removeUser,
    setDialogAddCourseOpen,
    getDialogAddCourseOpen,
    addCourse
} from './adminPanelSlice';
import Table from '@material-ui/core/Table';
import Select from '@material-ui/core/Select';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import TextField from '@material-ui/core/TextField';
import { getHours, getMinutes } from 'date-fns';


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
    }
});


export function AddUser(props) {
    const [value, setValue] = React.useState('normal');
    const [firstNameValue, setFirstNameValue] = React.useState('');
    const [lastNameValue, setLastNameValue] = React.useState('');
    const [emailValue, setEmailValue] = React.useState('');
    const [passwordValue, setPasswordValue] = React.useState('');
    const dispatch = useDispatch();

    const handleValueChange = (event) => {
        setValue(event.target.value);

    };

    const handleFirstNameChange = (event) => {
        setFirstNameValue(event.target.value);

    };

    const handleLastNameChange = (event) => {
        setLastNameValue(event.target.value);

    };

    const handleEmailChange = (event) => {
        setEmailValue(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPasswordValue(event.target.value);
    };

    return (
        <FormControl component="fieldset">
            <TextField label="First Name" id="first-name" value={firstNameValue} onChange={handleFirstNameChange}></TextField>
            <TextField label="Last Name" id="last-name" value={lastNameValue} onChange={handleLastNameChange}></TextField>
            <TextField label="Email" id="email" value={emailValue} onChange={handleEmailChange}></TextField>
            <TextField type='password' label="Password" id="password" value={passwordValue} onChange={handlePasswordChange}></TextField>
            <FormLabel component="legend">Role</FormLabel>
            {props.loginResponse?
            <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleValueChange}>
                <FormControlLabel value="admin" control={<Radio />} label="Admin" />
                <FormControlLabel value="normal" control={<Radio />} label="User" />
            </RadioGroup> :''
            }
            <Button onClick={() => dispatch(addUser({
                name: firstNameValue,
                name2: lastNameValue,
                email: emailValue,
                role: value,
                password: passwordValue
            }))}>Create User</Button>
        </FormControl>
    )
}

function Users(props) {
    const open = useSelector(getDialogAddUserOpen)
    const dispatch = useDispatch();
    const classes = useStyles();

    let rows = props.users.map(function (x) {
        let name = x.firstName
        let name2 = x.lastName
        let email = x.email
        let role = x.role
        let id = x._id
        return { name, name2, email, role, id }
    })
    return (
        <div className={classes.dialogDiv}>
            <TableContainer >
                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Remove User</TableCell>
                            <TableCell align="right">First Name</TableCell>
                            <TableCell align="right">Last Name</TableCell>
                            <TableCell align="right">E-mail</TableCell>
                            <TableCell align="right">Role</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow>
                                <TableCell>
                                    <Button onClick={() => dispatch(removeUser({ _id: row.id, token: props.loginResponse.token }))}>
                                        <RemoveCircleIcon />
                                    </Button>
                                </TableCell>
                                <TableCell align="right">{row.name}</TableCell>
                                <TableCell align="right">{row.name2}</TableCell>
                                <TableCell align="right">{row.email}</TableCell>
                                <TableCell align="right">{row.role}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Tooltip title="Add user">
                <Button className={classes.button} onClick={() => dispatch(setDialogAddUserOpen(true))}>
                    <AddIcon>

                    </AddIcon>
                </Button>
            </Tooltip>
            <Dialog onClose={() => dispatch(setDialogAddUserOpen(false))} open={open}>
                <div className={classes.dialog}>
                    <AddUser loginResponse={props.loginResponse}>

                    </AddUser>
                </div>
            </Dialog>
        </div>
    )
}

export function AdminPanel() {

    const classes = useStyles();
    const [menuOpen, setMenuOpen] = useState(false)
    const users = useSelector(getUsers)
    const open = useSelector(getDialogUsersOpen)
    const courseOpen = useSelector(getDialogAddCourseOpen)
    const loginResponse = useSelector(getLoginResponse)
    const usersChanged = useSelector(getUsersChanged)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(requestAllUsers(loginResponse.token))
    }, [usersChanged]);

    const [fullNameValue, setFullNameValue] = React.useState('');
    const [shortNameValue, setShortNameValue] = React.useState('');
    const [weekValue, setWeekValue] = React.useState('monday');
    const [descriptionValue, setDescriptionValue] = React.useState('');
    const [startHourValue, setStartHourValue] = React.useState(new Date('2014-08-18T00:00:00'));
    const [endHourValue, setEndHourValue] = React.useState(new Date('2014-08-18T00:00:00'));
    const [parityValue, setParityValue] = React.useState('all');
    const [courseTypeValue, setCourseTypeValue] = React.useState('lecture');
    const [keeperValue, setKeeperValue] = React.useState('');

    const handleFullNameChange = (event) => {
        setFullNameValue(event.target.value);

    };

    const handleShortNameChange = (event) => {
        setShortNameValue(event.target.value);

    };

    const handleWeekChange = (event) => {
        setWeekValue(event.target.value);

    };

    const handleDescriptionChange = (event) => {
        setDescriptionValue(event.target.value);
    };

    const handleStartHourChange = (hour) => {
        setStartHourValue(hour);
    };

    const handleEndHourChange = (hour) => {
        setEndHourValue(hour);
    };

    const handleParityChange = (event) => {
        setParityValue(event.target.value);
    };

    const handleCourseTypeChange = (event) => {
        setCourseTypeValue(event.target.value);
    };

    const handleKeeperChange = (event) => {
        setKeeperValue(event.target.value);
    }

    return (
        <div className="adminPanel">
            <Button onClick={() => setMenuOpen(true)}>
                <MenuIcon></MenuIcon>
            </Button>
            <h4>
                Panel Admina
            </h4>
            <Drawer className={{ paper: classes.paper }} anchor={"left"} open={menuOpen} onClose={() => setMenuOpen(false)}>
                <div
                    role="presentation"
                    onClick={() => setMenuOpen(false)}
                    onKeyDown={() => setMenuOpen(false)}
                >
                    <List>
                        <ListItem button onClick={() => dispatch(setDialogUsersOpen(true))} key={"Users"}>
                            <ListItemText primary={"Users"} />
                        </ListItem>
                        <ListItem button onClick={() => dispatch(setDialogAddCourseOpen(true))} key={"Add course"}>
                            <ListItemText primary={"Add course"} />
                        </ListItem>
                    </List>
                </div>
            </Drawer>
            <Dialog onClose={() => dispatch(setDialogAddCourseOpen(false))} open={courseOpen}>
                <div className={classes.dialog}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Choose course parameters</FormLabel>
                        <TextField label="Course Full Name" value={fullNameValue} onChange={handleFullNameChange}></TextField>
                        <TextField label="Course Short Name" value={shortNameValue} onChange={handleShortNameChange}></TextField>
                        <FormLabel component="legend">Day of the Week</FormLabel>
                        <RadioGroup name="weekType" value={weekValue} onChange={handleWeekChange}>
                            <FormControlLabel value="monday" control={<Radio />} label="Monday" />
                            <FormControlLabel value="tuesday" control={<Radio />} label="Tuesday" />
                            <FormControlLabel value="wednesday" control={<Radio />} label="Wednesday" />
                            <FormControlLabel value="thursday" control={<Radio />} label="Thursday" />
                            <FormControlLabel value="friday" control={<Radio />} label="Friday" />
                            <FormControlLabel value="saturday" control={<Radio />} label="Saturday" />
                            <FormControlLabel value="sunday" control={<Radio />} label="Sunday" />
                        </RadioGroup>
                        <TextField label="Description" value={descriptionValue} onChange={handleDescriptionChange}></TextField>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardTimePicker
                                label="Start Hour"
                                value={startHourValue}
                                onChange={handleStartHourChange}
                            />
                            <KeyboardTimePicker
                                label="Start Hour"
                                value={endHourValue}
                                onChange={handleEndHourChange}
                            />
                        </MuiPickersUtilsProvider>
                        <FormLabel component="legend">Parity</FormLabel>
                        <RadioGroup name="parity" value={parityValue} onChange={handleParityChange}>
                            <FormControlLabel value="all" control={<Radio />} label="Both weeks" />
                            <FormControlLabel value="tp" control={<Radio />} label="Odd weeks" />
                            <FormControlLabel value="tn" control={<Radio />} label="Even weeks" />
                        </RadioGroup>
                        <FormLabel component="legend">Course Type</FormLabel>
                        <RadioGroup name="courseType" value={courseTypeValue} onChange={handleCourseTypeChange}>
                            <FormControlLabel value="seminar" control={<Radio />} label="Seminar" />
                            <FormControlLabel value="lecture" control={<Radio />} label="Lecture" />
                            <FormControlLabel value="lab" control={<Radio />} label="Lab" />
                            <FormControlLabel value="project" control={<Radio />} label="Project" />
                            <FormControlLabel value="exercises" control={<Radio />} label="Exercises" />
                        </RadioGroup>
                        <FormLabel component="legend">Select keeper</FormLabel>
                        <Select value={keeperValue} onChange={handleKeeperChange}>
                            {users.map((user) => (
                                <MenuItem value={user}>{user.firstName + " " + user.lastName}</MenuItem>
                            ))}
                        </Select>
                        <Button onClick={() => dispatch(addCourse({
                            course: {
                                contenders: [],
                                courseFullName: fullNameValue,
                                courseShortName: shortNameValue,
                                dayOfCourse: weekValue,
                                description: descriptionValue,
                                keeper: keeperValue,
                                lecturers: [],
                                parity: parityValue,
                                type: courseTypeValue,
                                startHour: getHours(startHourValue),
                                endHour: getHours(endHourValue),
                                startMinute: getMinutes(startHourValue),
                                endMinute: getMinutes(endHourValue)
                            },
                            token: loginResponse.token
                        }))}>Create Course</Button>
                    </FormControl>
                </div>
            </Dialog>
            <Dialog onClose={() => dispatch(setDialogUsersOpen(false))} open={open}>
                <div>
                    <Users users={users} loginResponse={loginResponse}>

                    </Users>
                </div>
            </Dialog>
        </div>
    );
}