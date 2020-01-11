import React, {Component} from 'react';
import Menu from "./MenuComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import RenderDishDetails from "./DishdetailComponent";
import About from "./AboutComponent";
import {connect} from 'react-redux';
import {addComment, fetchComments, fetchDishes, fetchPromos} from "../redux/ActionCreators";
import {actions} from "react-redux-form";

const mapStateToProps = (state) => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
};

const mapDispatchToProps = (dispatch) => ({
    addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
    fetchDishes: () => {
        dispatch(fetchDishes())
    },
    resetFeedbackForm: () => {
        dispatch(actions.reset('feedback'))
    },
    fetchComments: () => {
        dispatch(fetchComments())
    },
    fetchPromos: () => {
        dispatch(fetchPromos())
    },
});

class Main extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchDishes()
        this.props.fetchComments()
        this.props.fetchPromos()
    }

    render() {

        const HomePage = () => {
            return (
                <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                      dishesLoading={this.props.dishes.isLoading}
                      dishesErrMsg={this.props.dishes.errMsg}
                      promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                      promosLoading={this.props.promotions.isLoading}
                      promosErrMsg={this.props.promotions.errMsg}
                      leader={this.props.leaders.filter((leader) => leader.featured)[0]}/>
            );
        }

        const DishWithId = ({match}) => {
            return (
                <RenderDishDetails
                    dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                    isLoading={this.props.dishes.isLoading}
                    ErrMsg={this.props.dishes.errMsg}
                    comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
                    commentsErrMsg={this.props.comments.errMsg}
                    addComments={this.props.addComment}/>
            );
        }

        const AboutPage = () => {
            return (
                <About leaders={this.props.leaders}/>
            );
        }

        return (
            <div className="App">
                <Header/>
                <Switch>
                    <Route path="/home" component={HomePage}/>
                    <Route path="/aboutus" component={AboutPage}/>
                    <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes}/>}/>
                    <Route path='/menu/:dishId' component={DishWithId}/>
                    <Route exact path="/contactus"
                           component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm}/>}/>
                    <Redirect to="/home"/>
                </Switch>
                <Footer/>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
