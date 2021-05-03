import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import './Login.css';
import { changeAppState } from '../actions/actions';
import { connect } from "react-redux";

function Login() {
    return (
        <div className="loginWorkArea">
            <Input placeholder="Login" inputProps={{ 'aria-label': 'login field' }} />
            <Input style={{margin: "10px"}} placeholder="Password" inputProps={{ 'aria-label': 'password field' }} />
            <Button variant="contained" color="primary" onClick={()=>{changeAppState("plan");}}>
                Tu kiedyś będzie logowanie
            </Button>
        </div>
    );
  }
 
export default connect(null, {
    changeAppState
  })(Login);