import React, {Component} from 'react';
import '../CSS/Form.css'
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
            emailid: '',
            password: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
    }
  
    handleChange(event){
        const {name, value} = event.target
        this.setState({
          [name] : value
        })
    }

    login(){

        firebase.auth().signInWithEmailAndPassword(this.state.emailid, this.state.password).then(() => {
            this.props.history.push('/welcome');
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log('Error code : ' + errorCode); 
            console.log('Error Msg : ' + errorMessage);
            // ...
          });
    }


  render(){
      return(
            <div className="Login" style={{ width: '100%' }}>
            <form>
                <div>
                    <Grid container spacing={1}>    
                        <Grid item xs={12}>
                            <TextField 
                            id="outlined-basic" 
                            label="Username" 
                            variant="outlined" 
                            margin="dense"
                            value={this.state.emailid} 
                            onChange={this.handleChange}
                            name="emailid"
                            
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
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                        <Button variant="contained" 
                            onClick={()=>{
                                this.props.history.push('/signup')}}>
                            Create Account
                        </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={this.login}
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
