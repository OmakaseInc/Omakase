import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import NavBar from './NavBar';
import VoteSurvey from './VoteSurvey';

class VoteApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'voteSurvey',
            navLink: '/',
            navMessage: 'Search for Food',
            foodType: null,
            location: null,
            hasLocationChoice: false,
            restaurant: null
        };

        this.handleFoodChoice = this.handleFoodChoice.bind(this);
        this.handleLocationChoice = this.handleLocationChoice.bind(this);
        this.handleRestaurantChoice = this.handleRestaurantChoice.bind(this);
        this.handleVote = this.handleVote.bind(this);
    }

    handleFoodChoice(choice) {
        this.setState({foodType: choice});
        this.setState({error: false});
    }

    handleLocationChoice(choice) {
        this.setState({location: choice});
        this.setState({hasLocationChoice: true});
        this.setState({error: false});
    }

    handleRestaurantChoice(choice) {
        this.setState({restaurant: choice});
        this.setState({error: false});
    }

    handleVote() {
        if (this.state.foodType && this.state.location && this.state.restaurant) {
            var data = {
                "Dish" : {
                    "dish_name" : this.state.foodType.label,
                    "voteCount": 1
                },
                "Location" : {
                    "location_name" : this.state.location.label
                },
                "Restaurant": {
                    "restaurant_name": this.state.restaurant.label,
                    "address" : "11 DishOneRestaurantAddress",
                    "zipcode" : 90025,
                    "imageUrl": "www.dishonerestaurant.com"
               }
           }

            axios.post('api/dish/add', data)
            .then((response) => {
                this.setState({page: 'userProfile'});
            })
            .catch((error) => {
                console.log(error);
            });

        } else {
            this.setState({error: true});
        }
    }

    render() {
        if (this.state.page === 'voteSurvey') {
            return (
                <div className="container-fluid">
                    <NavBar navLink={this.state.navLink} navMessage={this.state.navMessage}/>
                    <div className="main-container">
                        <div className="blurred-container-vote-survey">
                            <div className="vote-survey-content">
                                {this.state.error && <p className="error-message"> Please complete the voting form! </p>}
                                <VoteSurvey
                                    handleFoodChoice={this.handleFoodChoice}
                                    handleLocationChoice={this.handleLocationChoice}
                                    hasLocationChoice={this.state.hasLocationChoice}
                                    handleRestaurantChoice={this.handleRestaurantChoice}
                                    handleVote={this.handleVote}
                                    userid={this.state.userid}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        if (this.state.page === 'userProfile') {
            return (
                <div className="container-fluid">
                    <NavBar navLink={this.state.navLink} navMessage={this.state.navMessage}/>
                    <div className="main-container">
                        <div className="blurred-container">
                            <div className="main-content">
                                <h1 className="vote-confirm"> You voted that {this.state.restaurant.label} has the best {this.state.foodType.label.toLowerCase()} in {this.state.location.label}! </h1>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default VoteApp;
