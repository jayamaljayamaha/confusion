import React, {Component} from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import {DISHES} from '../shared/dishes'
import Menu from "./MenuComponent";
import DishDetail from "./DishdetailComponent";


class Main extends Component{

    constructor(props) {
        super(props);

        this.state = {
            dishes: DISHES,
            selectedDish: null
        };
    }

    onSelectDish(dishId){
        this.setState({selectedDish: dishId})
    }

    render() {
        return (
            <div className="App">
                <Navbar dark color="primary">
                    <div className="container">
                        <NavbarBrand href="/">Confusion</NavbarBrand>
                    </div>
                </Navbar>
                <Menu dishes={this.state.dishes} onClick={(dishId) => this.onSelectDish(dishId)}/>
                <DishDetail dish={this.state.dishes.filter((dish) => dish.id===this.state.selectedDish)[0]}/>
            </div>
        );
    }
}

export default Main;
