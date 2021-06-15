import './Calendar.css';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLoginResponse } from '../Login/loginSlice';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import PeopleIcon from '@material-ui/icons/People';
import CheckIcon from '@material-ui/icons/Check';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';

import {
    getDialogOpen,
    setDialogOpen,
    setDay,
    setHour,
    requestAllCourses,
    getCourses,
    getDay,
    getHour,
    teachCourse,
    dontTeachCourse,
    getCoursesChanged,
    removeCourse,
    getLecturerDialogOpen,
    setLecturerDialogOpen
} from './calendarSlice';
import { getDialogUsersOpen, getReloadCourses, setDialogUsersOpen } from '../AdminPanel/adminPanelSlice'
const hours = ['7.30', '9.15', '11.15', '13.15', '15.15', '17.05', '18.55']
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
var cardIndex = 0;

const useStyles = makeStyles({
    button: {
        margin: 5,
        width: '15vh',
        height: '15vh',
        fontSize: '26px',
    },
    list: {
        width: '80vh',
        height: '80vh',
    },
    dialog: {
        margin: 15,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardActions: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

function CreateHour(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    var day = [];
    const courses = useSelector(getCourses)

    const openDialog = (hour, day) => {
        dispatch(setDay(day))
        dispatch(setHour(hour))
        dispatch(setDialogOpen(true))
    }

    const getNumberOfCourses2 = (i, hour) => {
        const filteredCourses = courses.filter(function (e) {
            let returnValue = (e.dayOfCourse === days[i].toLowerCase() && e.startHour.toString() + '.' + e.startMinute.toString() === hour)
            return returnValue
        })
        return filteredCourses.length.toString();
    }

    for (let i = 0; i < 5; i++) {
        day.push(
            <div className='divCard'>
                <div className='divHourName'>
                    {i === 0 && <h2>{props.hour}</h2>}
                </div>
                <Button
                    className={classes.button}
                    key={cardIndex}
                    variant='contained'
                    color="primary"
                    onClick={() => openDialog(props.hour, days[i].toLowerCase())}>
                    {getNumberOfCourses2(i, props.hour)}
                </Button>
            </div>
        )
    }
    return day;
}

function CreateDays() {
    const classes = useStyles();
    var day = []
    day.push(
        <h2>
            Day/Hour
        </h2>
    )
    for (let i = 0; i < 5; i++) {
        day.push(
            <h2 className='dayName'>
                {days[i]}
            </h2>
        )
    }
    return day;
}

function CreateCalendar(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const courses = useSelector(getCourses)

    const openDialog = () => {
        dispatch(setDay('none'))
        dispatch(setDialogOpen(true))
    }
    var calendar = [];
    calendar.push(
        <div className='daysRow'>
            <CreateDays>

            </CreateDays>
        </div>
    )
    for (let i = 0; i < hours.length; i++) {
        calendar.push(
            <div className='dayRow'>
                <CreateHour hour={hours[i]}>

                </CreateHour>
            </div>
        )
    }

    const getNumberOfCourses = () => {
        const filteredCourses = courses.filter(function (e) {
            let returnValue = (!(hours.includes(e.startHour.toString() + '.' + e.startMinute.toString())))
            return returnValue
        })
        return filteredCourses.length.toString();
    }

    calendar.push(
        <div className='divOtherHours'>
            <div className='divHourName'>
                <h2>Other hours</h2>
            </div>
            <Button
                className={classes.button}
                key={cardIndex}
                variant='contained'
                color="primary"
                onClick={() => openDialog()}>
                {getNumberOfCourses()}
            </Button>
        </div>
    )
    return calendar;
}

function createContenders(course, loginData, add) {
    let contenders = course.contenders;
    if (!add && contenders.length > 1 ) contenders.splice(contenders.map(function (f) { return f._id }).indexOf(loginData.data.user._id), 1)
    else if (!add) contenders = []
    if (add) contenders.push(loginData.data.user)
    course.contenders = contenders
    return course
}

function createLecturers(course, user, add) {
    let contenders = course.contenders;
    if(contenders.length > 1) contenders.splice(contenders.map(function (f) { return f._id }).indexOf(user._id), 1)
    else contenders = [] 
    if (add && !course.lecturers.find(x=>x._id === user._id)) course.lecturers.push(user)
    course.contenders = contenders
    return course
}

function ShowDialog(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const openUsers = useSelector(getLecturerDialogOpen) 
    var _ = require('lodash');
    var filteredCourses = []
    if (props.day === 'none') {
        filteredCourses = props.courses.filter(function (e) {
            let returnValue = (!(hours.includes(e.startHour.toString() + '.' + e.startMinute.toString())))
            return returnValue
        })
    } else {
        filteredCourses = props.courses.filter(function (e) {
            let returnValue = (e.dayOfCourse === props.day && e.startHour.toString() + '.' + e.startMinute.toString() === props.hour)
            return returnValue
        })
    }
    var listElements = []
    if (filteredCourses.length === 0) {
        listElements.push(
            <Card className={classes.dialog}>
                <CardContent>
                    Brak kursów :(
                </CardContent>
            </Card>
        )
    } else {
        filteredCourses.forEach(function (e) {
            console.log(e, openUsers)
           
            var objectToSend = _.cloneDeep(e)
            listElements.push(
                <Card className={classes.dialog} variant="outlined">
                    <CardContent>
                        <div className='dialogList'>
                            <div>
                                {e.courseFullName}
                            </div>
                            <div>
                                {"Keeper: " + e.keeper.firstName + ' ' + e.keeper.lastName}
                            </div>
                            <div>
                                {e.description}
                            </div>
                            <div>
                                {"Lecturers: "}
                                {e.lecturers.map(function(f) {return f.firstName+" "+f.lastName})}
                            </div>
                        </div>
                    </CardContent>
                    <CardActions className={classes.cardActions}>
                        {e.contenders.map(function (f) { return f._id }).indexOf(props.loginResponse.data.user._id) === -1 ?
                            <Tooltip title="I want to teach that!">
                                <IconButton onClick={() => dispatch(teachCourse(
                                    {
                                        token: props.loginResponse.token,
                                        course: createContenders(objectToSend, props.loginResponse, true)
                                    }
                                ))}>
                                    <AddIcon />
                                </IconButton>
                            </Tooltip> :
                            <Tooltip title="I don't want to teach that!">
                                <IconButton onClick={() => dispatch(dontTeachCourse(
                                    {
                                        token: props.loginResponse.token,
                                        course: createContenders(objectToSend, props.loginResponse, false)
                                    }
                                ))}>
                                    <CheckIcon />
                                </IconButton>
                            </Tooltip>}
                        {props.loginResponse.data.user.role === 'admin' ?
                            <Tooltip title="Remove course">
                                <IconButton onClick={() => dispatch(removeCourse(
                                    {
                                        token: props.loginResponse.token,
                                        _id: e._id
                                    }
                                ))}>
                                    <RemoveCircleIcon />
                                </IconButton>
                            </Tooltip>
                            : ''}
                        {_.isEqual(props.loginResponse.data.user, e.keeper) || props.loginResponse.data.user.role === 'admin' ?
                            <div>
                                <Tooltip title="Check who wants to teach">
                                    <IconButton onClick={() => dispatch(setLecturerDialogOpen({open: true, course: e}))}>
                                        <PeopleIcon />
                                    </IconButton>
                                </Tooltip>
                                <Dialog onClose={() => dispatch(setLecturerDialogOpen(false))} open={openUsers.open&&(_.isEqual(e, openUsers.course))}>
                                    <TableContainer >
                                        <Table >
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="right">Accept</TableCell>
                                                    <TableCell align="right">Deny</TableCell>
                                                    <TableCell align="right">First Name</TableCell>
                                                    <TableCell align="right">Last Name</TableCell>
                                                    <TableCell align="right">E-mail</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {e.contenders.map((row) => (
                                                    <TableRow>
                                                        <TableCell>
                                                            <Button onClick={() => dispatch(teachCourse({
                                                                course: createLecturers(objectToSend,row , true),
                                                                token: props.loginResponse.token
                                                            }))}>
                                                                <CheckIcon />
                                                            </Button>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Button onClick={() => dispatch(teachCourse({
                                                                course: createLecturers(objectToSend,row, false),
                                                                token: props.loginResponse.token
                                                            }))}>
                                                                <RemoveCircleIcon />
                                                            </Button>
                                                        </TableCell>
                                                        <TableCell align="right">{row.firstName}</TableCell>
                                                        <TableCell align="right">{row.lastName}</TableCell>
                                                        <TableCell align="right">{row.email}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Dialog>
                            </div>
                            : <div>why</div>}
                    </CardActions>
                </Card>
            )
        })
    }
    return listElements
}

export function Calendar() {
    const classes = useStyles();
    const open = useSelector(getDialogOpen)
    const loginResponse = useSelector(getLoginResponse)
    const courses = useSelector(getCourses)
    const coursesChanged = useSelector(getCoursesChanged)
    const day = useSelector(getDay)
    const hour = useSelector(getHour)
    const reloadCourses = useSelector(getReloadCourses)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(requestAllCourses(loginResponse.token))
    }, [coursesChanged, reloadCourses]);

    return (
        <div className='calendarSpace'>
            {CreateCalendar()}
            <Dialog className={classes.dialog} onClose={() => dispatch(setDialogOpen(false))} open={open}>
                <div className={classes.list}>
                    <h2>{day !== 'none' ? `Courses ${day} ${hour}` : 'Irregular hours courses'}</h2>
                    <ShowDialog courses={courses} day={day} hour={hour} loginResponse={loginResponse}>

                    </ShowDialog>
                </div>
            </Dialog>
        </div>
    )
}