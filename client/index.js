import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import SearchApp from './components/SearchApp.js';
import VoteApp from './components/VoteApp.js';
import AboutPage from './components/AboutPage.js';
import SigninApp from './components/SigninApp.js';

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={SearchApp} />
        <Route path="/vote" component={VoteApp} />
        <Route path="/vote/:userid" component={VoteApp}/>
        <Route path="/about" component={AboutPage} />
        <Route path="/login-to-vote" component={SigninApp} />
        <Route path="/login" component={SigninApp} />
        <Route path="/signup" component={SigninApp} />
    </Router>
), document.getElementById("app"));
