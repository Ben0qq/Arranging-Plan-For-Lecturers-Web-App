import './Calendar.css';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from '../Login/loginSlice';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
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
        width: 100,
        height: 100,
    }
});

function CreateHour(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    var day = [];

    const openDialog = (hour, day) => {
        dispatch(setDay(day))
        dispatch(setHour(hour))
        dispatch(setDialogOpen(true))
    }

    for (let i = 0; i < 5; i++) {
        day.push(
            <div className='divCard'>
                {i === 0 ? <h2>{props.hour}</h2> : <div></div>}
                <Button
                    className={classes.button}
                    key={cardIndex}
                    variant='contained'
                    color="primary"
                    onClick={openDialog(props.hour, days[i].toLowerCase())}>
                    johnnytest
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

function CreateCalendar() {
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
    return calendar;
}

function showDialog(courses, day, hour) {
    const filteredCourses = courses.filter(function (e) {
        return (e.dayOfCourse === day && e.startHour.toString() + '.' + e.startMinute.toString() === hour)
    })
    var listElements = []
    for (const e in filteredCourses) {
        listElements.push(
            <ListItem button>
                {e.courseFullName}
            </ListItem>
        )
    }
    return listElements
}

export function Calendar() {
    const open = useSelector(getDialogOpen)
    const token = useSelector(getToken)
    const courses = useSelector(getCourses)
    const day = useSelector(getDay)
    const hour = useSelector(getHour)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(requestAllCourses(token))
    });

    return (
        <div className='calendarSpace'>
            {CreateCalendar()}
            <Dialog onClose={() => dispatch(setDialogOpen(false))} open={open}>
                <List>
                    {showDialog(courses, day, hour)}
                </List>
            </Dialog>
        </div>
    )
}