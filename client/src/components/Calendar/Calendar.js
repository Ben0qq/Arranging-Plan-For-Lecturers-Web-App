import './Calendar.css';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';

const hours = ['7.30', '9.15', '11.15', '13.15', '15.15', '17.05', '18.55']
const days = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri'];
var cardIndex = 0;

const useStyles = makeStyles({
    card: {
        margin: 5,
        width: 100,
        height: 100,
    }
});

function CreateHour(props) {
    const classes = useStyles();
    var day = [];
    for (let i = 0; i < 5; i++) {
        day.push(
            <div className='divCard'>
                {i === 0 ? <h2>{props.hour}</h2> : <div></div>}
                <Card className={classes.card} key={cardIndex}>
                    <CardContent>
                        <h4>
                            johnytest
                        </h4>
                    </CardContent>
                </Card>
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
    return (
        <div className='calendarSpace'>
            {CreateCalendar()}
        </div>
    )
}