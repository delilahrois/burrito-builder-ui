import React, { Component } from 'react';

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: []
    };
  }



  handleSubmit = e => {
    e.preventDefault();
    if(this.state.name.length && this.state.ingredients.length) {
      this.props.handleNewOrder({name: this.state.name, ingredients: this.state.ingredients})
    this.clearInputs();
    }
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  handleNameChange = (e) => {
    this.setState({name: e.target.value})
  }

  handleIngredientChange = (e) => {
    e.preventDefault();
    this.setState({ingredients: [...this.state.ingredients, e.target.value]})
  }

  

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      console.log(ingredient)
      return (
        <button key={ingredient} name={ingredient} value={ingredient} onClick={e => this.handleIngredientChange(e)}>
          {ingredient}
        </button>
      )
    });

    return (
      <form className="order-form">
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
        />

        { ingredientButtons }

        <p className="current-order">Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>

        <button className="submit-btn" onClick={e => this.handleSubmit(e)}>
          Submit Order
        </button>
      </form>
    )
  }
}

export default OrderForm;
