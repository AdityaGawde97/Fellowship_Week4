import React, {Component} from 'react';
import '../CSS/SignUp.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import firebase from '../FirebaseConfig'

const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));

export default class Register extends Component{
  constructor(props){
        super(props)
        this.state = {
            firstname: '',
            lastname: '',
            emailid: '',
            password: '',
            comfirmpassword: '',

        };
        this.handleChange = this.handleChange.bind(this);
        
    }

    handleChange(event){
        // const {name, value} = event.target
        console.log(event.target.name + ' :');
        
        this.setState({
          [event.target.name] : event.target.value

        },()=>{
            console.log(this.state.firstname + ' :a');
            
        })
    }

    writeUserData =()=> {
        firebase.database().ref('users/').push({
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          emailid: this.state.emailid,
          password: this.state.password
        });
      }

    // a=()=>{
    //     alert('hello ' + this.state.firstname);
        
    // }

  render(){
      return(
            <div className="Login" style={{ width: '100%' }}>
            <form>
                <div>
                
                    <Grid container spacing={2}  >
                        <Grid item xs={6} >
                            <TextField 
                                id="outlined-basic" 
                                label="First name" 
                                variant="outlined" 
                                margin="dense"
                                value={this.state.firstname} 
                                onChange={this.handleChange}
                                name="firstname"
                                className={useStyles.textField} 
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField 
                                id="outlined-basic" 
                                label="Last name" 
                                variant="outlined" 
                                value={this.state.lastname} 
                                onChange={this.handleChange}
                                name="lastname"
                                margin="dense"
                                className={useStyles.textField}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>    
                        <Grid item xs={12}>
                            <TextField 
                            id="outlined-basic" 
                            fullWidth
                            label="Email" 
                            variant="outlined" 
                            value={this.state.username} 
                            onChange={this.handleChange}
                            name="emailid"
                            margin="dense"
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField 
                                id="outlined-basic" 
                                label="Password" 
                                variant="outlined" 
                                margin="dense"
                                value={this.state.password} 
                                onChange={this.handleChange}
                                name="password"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField 
                                id="outlined-basic" 
                                label="Confirm"
                                variant="outlined" 
                                margin="dense"
                                value={this.state.comfirmpassword} 
                                onChange={this.handleChange}
                                name="comfirmpassword"
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                        <Button variant="contained" 
                            onClick={()=>{
                                this.props.history.push('/')}}>
                        Sign in instead
                        </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={this.writeUserData}
                            >
                            Next
                            </Button>
                        </Grid>
                    </Grid>
                
                </div>
            </form>
            </div>
           
      );
  }
}
