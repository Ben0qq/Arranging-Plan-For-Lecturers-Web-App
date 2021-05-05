import './Calendar.css';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';

const hours = ['7.30', '9.15', '11.15', '13.15', '15.15', '17.05', '18.55']

const useStyles = makeStyles({
    card: {
      margin: 5,
      width: 100,
      height: 100,
    }
  });

function CreateCalendar() {
    const classes = useStyles();
    var calendar = [];
    let hourCounter=0;
    for (let i = 0; i<5; i++){
        calendar.push(
            <h4>
                {hours[i]}
            </h4>
        )
        calendar[i] = []
        for(let j = 0; j<hours.length; j++){
            if(hourCounter === j){
                calendar[i].push(
                    <h4>
                        {hours[j]}
                    </h4>
                )
            }
            calendar[i].push(
                <Card className={classes.card}>
                    <CardContent>
                        <h4>
                            johnytest
                        </h4>
                    </CardContent>
                </Card>
            )
            if(j === hours.length-1) hourCounter++;
        }
    }
    return calendar;
}

export function Calendar() {
    return(
        <div className='calendarSpace'>
            {CreateCalendar()}
        </div>
    )
  }