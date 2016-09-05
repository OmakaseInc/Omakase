import React from 'react';
import { Link, browserHistory } from 'react-router';
import axios from 'axios';
import { Button } from 'react-bootstrap';

class SigninApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            userid: null,
            error: false,
            errorMessage: null,
            previousPage: props.location.pathname
        }

        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleValidInput = this.handleValidInput.bind(this);
        this.handleVerification = this.handleVerification.bind(this);
        this.handleRerouting = this.handleRerouting.bind(this);
    }

    handleUserInput(event) {
        this.setState({username: event.target.value});
    }

    handleValidInput() {
        if(!this.state.username.length) {
            return <div className="error-message"> Please input a Username </div>
        }
        else {
            if(this.state.previousPage === '/login-to-vote' || this.state.previousPage === '/login') {
                return <Button bsSize="large" className="login-button" onClick={() => this.handleVerification('check')}> Login </Button>
            }
            if(this.state.previousPage === '/signup') {
                return <Button bsSize="large" className="login-button" onClick={() => this.handleVerification('add')}> Signup </Button>
            }
        }
    }

    handleVerification(fn) {
        axios.get('/api/user/' + fn, {
            params: {
              id: 12353623,
              name: this.state.username
            }
          })
            .then(response => {
                if(typeof response.data === 'string') {
                    this.setState({error: true});
                    this.setState({errorMessage: response.data})
                }

                if(typeof response.data === 'object') {
                    this.setState({userid: response.data.FB_id})
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    handleRerouting() {
        if(this.state.userid) {
            if(this.state.previousPage === '/login-to-vote') {
                {browserHistory.push(`/vote/${this.state.userid}`)}
            }
            else {
                {browserHistory.push('/')}
            }
        }

        if(this.state.error) {
            return <div> {this.state.errorMessage} </div>
        }
    }

    render() {
        if(this.state.previousPage === '/login' || this.state.previousPage === '/login-to-vote') {
            return (
                <div className="container-fluid">
                <div className="nav-logo">
                    <a href="/"><img src='./logo_medium.jpg'/></a>
                </div>
                <div className="main-container">
                    <div className="blurred-container">
                        <div className="main-content">
                            <p> LOGIN </p>
                            <form>
                                <input type="text" value={this.state.username} onChange={this.handleUserInput} placeholder="Type username" />
                            </form>
                            {this.handleValidInput()}
                            {this.handleRerouting()}
                        <a href="/auth/facebook" class="btn btn-primary"><span class="fa fa-facebook"></span> Facebook</a>

                        </div>
                    </div>
                </div>
                </div>
            );
        }
        if(this.state.previousPage === '/signup') {
            return (
                <div className="container-fluid">
                <div className="nav-logo">
                    <a href="/"><img src='./logo_medium.jpg'/></a>
                </div>
                <div className="main-container">
                    <div className="blurred-container">
                        <div className="main-content">
                            <p> WELCOME </p>
                            <form>
                                <input type="text" value={this.state.username} onChange={this.handleUserInput} placeholder="Type username" />
                                <input type="text" placeholder="Type in password" />
                                <input type="text" placeholder="Retype password" />
                            </form>
                            {this.handleValidInput()}
                            {this.handleRerouting()}
                        </div>
                    </div>
                </div>
                </div>
            );

        }
    }
}



export default SigninApp;
