import './Calendar.css';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from '../Login/loginSlice';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';

import {
    getDialogOpen,
    setDialogOpen,
    setDay,
    setHour,
    requestAllCourses,
    getCourses,
    getDay,
    getHour,
} from './calendarSlice';

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

    const getNumberOfCourses = (i, hour) => {
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
                    {getNumberOfCourses(i, props.hour)}
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

function ShowDialog(props) {
    const classes = useStyles();
    console.log(props.courses)
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
                        </div>
                    </CardContent>
                    <CardActions className={classes.cardActions}>
                        <Tooltip title="I want to teach that!">
                            <IconButton >
                                <AddIcon />
                            </IconButton>
                        </Tooltip>
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
    const token = useSelector(getToken)
    const courses = useSelector(getCourses)
    const day = useSelector(getDay)
    const hour = useSelector(getHour)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(requestAllCourses(token))
    }, []);

    return (
        <div className='calendarSpace'>
            {CreateCalendar()}
            <Dialog className={classes.dialog} onClose={() => dispatch(setDialogOpen(false))} open={open}>
                <div className={classes.list}>
                    <h2>{day !== 'none' ? `Courses ${day} ${hour}` : 'Irregular hours courses'}</h2>
                    <ShowDialog courses={courses} day={day} hour={hour}>

                    </ShowDialog>
                </div>
            </Dialog>
        </div>
    )
}