import React, {Component} from 'react';
import '../CSS/SignUpCss.css'
import Glogo from '../images/account.svg'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import firebase from '../FirebaseConfig';
import Container from '@material-ui/core/Container'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';

export default class Register extends Component{
  constructor(props){
        super(props)
        this.state = {
            firstname: '',
            lastname: '',
            emailid: '',
            password: '',
            confirmpassword: '',
            showPassword: 'false',
            errors: {},
        };
        this.handleChange = this.handleChange.bind(this);
        this.writeUserData = this.writeUserData.bind(this);
        this.submitUserRegistrationForm = this.submitUserRegistrationForm.bind(this);
    }

    handleChange(event){
        
        this.setState({
          [event.target.name] : event.target.value
        })
    }

    submitUserRegistrationForm(event) {
        
        event.preventDefault();
        if (this.validateForm()) {
            this.setState({
                [event.target.name] : event.target.value,
                [event.target.formvalid]:  !event.target.formvalid
            })
            this.move();
            this.writeUserData();
        }
    }

    validateForm=()=> {

        let errors = {};
        var formIsValid = true;

        if (!this.state.firstname) {
            formIsValid = false;
            errors["firstname"] = "*Please enter your First Name.";
        }

        if (!this.state.lastname) {
            formIsValid = false;
            errors["lastname"] = "*Please enter your Last Name.";
        }
  
        if (!this.state.emailid) {
          formIsValid = false;
          errors["emailid"] = "*Please enter your email-ID.";
        }
  
        if (typeof this.state.emailid !== "undefined") {
          //regular expression for email validation
          var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
          if (!pattern.test(this.state.emailid)) {
            formIsValid = false;
            errors["emailid"] = "*Please enter valid email-ID.";
          }
        }
  
        if (!this.state.password) {
          formIsValid = false;
          errors["password"] = "*Please enter your password.";
        }
  
        if (typeof this.state.password !== "undefined") {
          if (!this.state.password.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
            formIsValid = false;
            errors["password"] = "*Please enter secure and strong password.";
          }
        }

        if (!this.state.confirmpassword) {
            formIsValid = false;
            errors["confirmpassword"] = "*Please confirm your password.";
        }
    
        if (typeof this.state.confirmpassword !== "undefined") {
            if (this.state.confirmpassword !== this.state.password) {
                formIsValid = false;
                errors["confirmpassword"] = "*Password does not match.";
            }
        }
  
        this.setState({
          errors: errors
        });
        return formIsValid;
    }


    handleClickShowPassword = () => {
        this.setState({ 
            showPassword: !this.state.showPassword
        });
    };

    handleMouseDownPassword = event => {
        event.preventDefault();
    };

    writeUserData(){
        let errors={}
        firebase.auth().createUserWithEmailAndPassword(this.state.emailid, this.state.password).then(()=>{
            firebase.database().ref('users/').push({
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                emailid: this.state.emailid,
                password: this.state.password
            })
            this.props.history.push('/');
        })
        .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log('Error code : ' + errorCode);
            console.log('Error Msg : ' + errorMessage);
            let msg = "This email id is already register with Fundoo Account"
            errors["emailid"] = msg;
            this.setState({
                errors: errors
            });
            // ...
        });
    }

    move = () => {
        let i=0;
        if (i === 0) {
          i = 1;
          let elem = document.getElementById("load");
          let elem2 = document.getElementById("loader");
          elem2.style.backgroundColor = 'lightgray';
          let width = 1;
          let id = setInterval(frame, 10);
          function frame() {
            if (width >= 100) {
              clearInterval(id);
              i = 0;
            } else {
              width++;
              elem.style.width = width + "%";
            }
          }
        }
      }

    render(){
        return(
            <Container maxWidth="lg">
                <div id="loader">
                    <div id="load"></div>
                </div>
                <div className="main-container">

                    <div className="col-container"> 

                        <form>
                            <div className="title">
                                <span style={{color: '#4285F4'}}>F</span>
                                <span style={{color: '#DB4437'}}>u</span>
                                <span style={{color: '#F4B400'}}>n</span>
                                <span style={{color: '#4285F4'}}>d</span>
                                <span style={{color: '#0F9D58'}}>o</span>
                                <span style={{color: '#DB4437'}}>o</span>
                            </div>
                            <div className="subtitle">
                                <span>Create your Fundoo Account</span>
                            </div>
                            <div className="row-container">

                                <div>
                                    <TextField 
                                        id="outlined-basic"
                                        label="First name" 
                                        variant="outlined" 
                                        margin="dense"
                                        value={this.state.firstname} 
                                        onChange={this.handleChange}
                                        name="firstname"
                                        error={this.state.errors.firstname}
                                        helperText={this.state.errors.firstname}
                                        className="item1"
                                    />
                                </div>

                                <div>
                                    <TextField 
                                        id="outlined-basic" 
                                        label="Last name" 
                                        variant="outlined" 
                                        value={this.state.lastname} 
                                        onChange={this.handleChange}
                                        name="lastname"
                                        margin="dense"
                                        error={this.state.errors.lastname}
                                        helperText={this.state.errors.lastname}
                                        className="item2"
                                    />
                                </div>

                            </div>

                            <div>
                                <TextField 
                                    id="outlined-basic"
                                    label="Email" 
                                    variant="outlined" 
                                    value={this.state.username} 
                                    onChange={this.handleChange}
                                    name="emailid"
                                    margin="dense"
                                    error={this.state.errors.emailid}
                                    helperText={this.state.errors.emailid ? 
                                        this.state.errors.emailid
                                        : "You can use letters, numbers & periods"}
                                    className="item3"
                                />
                            </div>

                            <div className="row-container">

                                <div>
                                    <TextField 
                                        id="outlined-basic"
                                        label="Password" 
                                        type={!this.state.showPassword ? 'text' : 'password'}
                                        // style={{ margin: 10 },{width:170}}
                                        size="small"
                                        variant="outlined" 
                                        value={this.state.password} 
                                        onChange={this.handleChange}
                                        name="password"
                                        margin="dense"
                                        error={this.state.errors.password}
                                        helperText={this.state.errors.password}
                                        className="item4"
                                    />
                                </div>

                                <div>
                                    <TextField 
                                        id="outlined-basic"
                                        label="Confirm" 
                                        type={!this.state.showPassword ? 'text' : 'password'}
                                        //style={{ marginLeft: 10 },{width:170}}
                                        variant="outlined" 
                                        value={this.state.confirmpassword} 
                                        onChange={this.handleChange}
                                        name="confirmpassword"
                                        margin="dense"
                                        error={this.state.errors.confirmpassword}
                                        helperText={this.state.errors.confirmpassword}
                                        className="item5"
                                    />
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={this.handleClickShowPassword}
                                    onMouseDown={this.handleMouseDownPassword}>
                                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                                </div>
                            </div>
                            <div className="passSpan">
                                <span>
                                    Use 8 or more characters with a mix of letters, numbers & symbols
                                </span>
                            </div>

                            <div className="row-container">
                                
                                <div className="item">
                                    <Button
                                        color="primary"
                                        size="large"
                                        onClick={()=>{
                                            this.props.history.push('/')}}
                                            >
                                    Sign in instead
                                    </Button>
                                </div>

                                <div className="item">
                                    <Button 
                                        variant="contained" 
                                        size="large"
                                        color="primary" 
                                        type="submit"
                                        onClick={this.submitUserRegistrationForm}>
                                    Next
                                    </Button>
                                </div>

                            </div>
                    </form>
                </div>
                <div className="glogo col-container">
                    <img src={Glogo} alt="fundoo logo" />
                    <div>
                        <p style={{textAlign: 'center'}}>
                        One account. All of Google working for you.
                        </p>
                    </div>
                </div> 
            </div>
        </Container>
      );
  }
}
