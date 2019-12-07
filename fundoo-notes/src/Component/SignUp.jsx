import React, {Component} from 'react';
import '../CSS/Form.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import firebase from '../FirebaseConfig';
import Box from '@material-ui/core/Box'

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
        this.writeUserData = this.writeUserData.bind(this);
        
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

    writeUserData(){
        firebase.auth().createUserWithEmailAndPassword(this.state.emailid, this.state.password).then(()=>{
            firebase.database().ref('users/').push({
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                emailid: this.state.emailid,
                password: this.state.password
            })
            this.props.history.push('/');
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
            <div>
                <form>
                    <Box border={1}> 

                        <Box>
                            <Box>
                                <TextField 
                                    id="outlined-basic" 
                                    label="First name" 
                                    variant="outlined" 
                                    margin="dense"
                                    value={this.state.firstname} 
                                    onChange={this.handleChange}
                                    name="firstname"
                                />
                            </Box>
                            <Box>
                                <TextField 
                                    id="outlined-basic" 
                                    label="Last name" 
                                    variant="outlined" 
                                    value={this.state.lastname} 
                                    onChange={this.handleChange}
                                    name="lastname"
                                    margin="dense"
                                />
                            </Box>
                        </Box>

                        <Box>
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
                        </Box>

                        <Box>
                            <Box>
                                <TextField 
                                    id="outlined-basic" 
                                    label="Password" 
                                    variant="outlined" 
                                    margin="dense"
                                    value={this.state.password} 
                                    onChange={this.handleChange}
                                    name="password"
                                />
                            </Box>
                            <Box>
                                <TextField 
                                    id="outlined-basic" 
                                    label="Confirm"
                                    variant="outlined" 
                                    margin="dense"
                                    value={this.state.comfirmpassword} 
                                    onChange={this.handleChange}
                                    name="comfirmpassword"
                                />
                            </Box>
                        </Box>

                        <Box>
                            <Box>
                                <Button variant="contained" 
                                    onClick={()=>{
                                        this.props.history.push('/')}}>
                                Sign in instead
                                </Button>
                            </Box>
                            <Box>
                                <Button 
                                        variant="contained" 
                                        color="primary" 
                                        onClick={this.writeUserData}>
                                Next
                                </Button>
                            </Box>
                        </Box>

                    </Box>
                </form>
            </div>
           
      );
  }
}
