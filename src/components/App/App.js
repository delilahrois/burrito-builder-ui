import React, { Component } from 'react';
import './App.css';
import {getOrders, submitOrder} from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      orders: []
    }
  }

  componentDidMount() {
    this.updateOrders()
  }

  updateOrders = () => {
    getOrders()
      .then(data => this.setState({orders: data.orders}))
      .catch(err => console.error('Error fetching:', err));
  }

  handleNewOrder = (order) => {
    submitOrder(order)
    .then(response => response.json())
    .then(this.componentDidMount())
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm handleNewOrder={this.handleNewOrder}/>
        </header>

        <Orders orders={this.state.orders}/>
      </main>
    );
  }
}


export default App;
