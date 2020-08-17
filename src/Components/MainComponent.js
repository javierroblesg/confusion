import React from 'react';
import { Menu } from './MenuComponent';
import { Header } from './HeaderComponent';
import { Footer } from './FooterComponent';
import { DISHES } from '../shared/dishes.js';
import DishDetail from './DishdetailComponent';


export class Main extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      selectedDish: null
    };
  }

  onDishSelect(dishID) {
    this.setState({ selectedDish: dishID });
  }

  render() {
    return (
      <div>
        <Header />
        <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />
        <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />
        <Footer />
      </div>
    ); 
  }
}

