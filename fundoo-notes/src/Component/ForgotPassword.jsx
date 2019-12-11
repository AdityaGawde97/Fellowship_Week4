import React, {Component} from 'react';
import '../CSS/Forgot.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import firebase from '../FirebaseConfig';

export default class Register extends Component{
  constructor(props){
        super(props)
        this.state = {
            emailid: '',
            errors: {},
        };
        this.handleChange = this.handleChange.bind(this);
        this.submitUserRegistrationForm = this.submitUserRegistrationForm.bind(this);
    }
  
    handleChange(event){
        const {name, value} = event.target
        this.setState({
          [name] : value
        })
    }



    submitUserRegistrationForm(event) {
        event.preventDefault();
        if (this.validateForm()) {
            this.setState({
                [event.target.name] : event.target.value,
                [event.target.formvalid]:  !event.target.formvalid
            })
        }
    }

    validateForm=()=> {

        let errors = {};
        var formIsValid = true;
  
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
  
        this.setState({
          errors: errors
        });
        
        return formIsValid;
    }

    resetPassword = () => {
        let errors = {};
        firebase.auth().sendPasswordResetEmail(this.state.emailid).then(() => {
            // Email sent.
            alert("The Password reset email is sent on your email address !")
            this.props.history.push('/');
        }).catch((error) => {
            // An error happened.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log('Error code : ' + errorCode); 
            console.log('Error Msg : ' + errorMessage);
            alert(error.code)
            errors["emailid"] = errorMessage;
            this.setState({
                errors: errors
            });
        });
    }

    render(){
        return(
            <div className="container">
                <form onSubmit={this.submitUserRegistrationForm}> 
                    <div className="title-container"> 
                        <div className="title3">
                            <span style={{color: '#4285F4'}}>F</span>
                            <span style={{color: '#DB4437'}}>u</span>
                            <span style={{color: '#F4B400'}}>n</span>
                            <span style={{color: '#4285F4'}}>d</span>
                            <span style={{color: '#0F9D58'}}>o</span>
                            <span style={{color: '#DB4437'}}>o</span>
                        </div>
                        <div className="subtitle4">
                            <span>Account recovery</span>
                        </div>
                        <div className="subtitle6">
                            <span>
                                Enter the email id that using with this Fundoo Account
                            </span>
                        </div>
                    </div>
                    <div>
                        <TextField 
                            id="outlined-basic" 
                            label="Email" 
                            className="tfield"
                            variant="outlined" 
                            value={this.state.emailid} 
                            onChange={this.handleChange}
                            name="emailid"
                            error={this.state.errors.emailid}
                            style={{marginTop: 50}} 
                            helperText={this.state.errors.emailid}
                        />
                    </div>
                    <div className="content">
                        <Button 
                            variant="contained" 
                            color="primary" 
                            size="large"
                            type="submit"
                            onClick={this.resetPassword}
                        >
                        Next
                        </Button>
                    </div>
                </form>
            </div>    
        );
    }
}
