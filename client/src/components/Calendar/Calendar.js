import './Calendar.css';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    getDialogOpen,
    setDialogOpen
    } from './calendarSlice';

const hours = ['7.30', '9.15', '11.15', '13.15', '15.15', '17.05', '18.55']
const days = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri'];
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
    for (let i = 0; i < 5; i++) {
        day.push(
            <div className='divCard'>
                {i === 0 ? <h2>{props.hour}</h2> : <div></div>}
                <Button className={classes.button} key={cardIndex} variant='contained' color="primary" onClick={()=>dispatch(setDialogOpen(true))}>
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

export function Calendar() {
    const open = useSelector(getDialogOpen)
    const dispatch = useDispatch();
    return (
        <div className='calendarSpace'>
            {CreateCalendar()}
            <Dialog onClose={() => dispatch(setDialogOpen(false))} open={open}>
                <h4>
                    johnnytest
                </h4>
            </Dialog>
        </div>
    )
}