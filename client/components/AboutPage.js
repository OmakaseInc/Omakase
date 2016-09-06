import React from 'react';
import { Link } from 'react-router';
import NavBar from './NavBar';

class AboutPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navLink: '/',
            navMessage: 'Search for Food'
        };
    }

    render() {
        return (
            <div className="container-fluid">
                <NavBar navLink={this.state.navLink} navMessage={this.state.navMessage}/>
                <div className="main-container">
                    <div className="blurred-container">
                        <div className="about-content">
                            <h1> About the Team </h1>
                            <h3> Coming soon... </h3>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AboutPage;
