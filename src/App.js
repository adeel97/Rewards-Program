import React, { Component } from 'react';
import Customer from './components/Customer'
import Header from './components/layout/Header'
import uuid from 'uuid'
import './App.css';

class App extends Component { 

  state = {
    data: [ 
      {customer_id: '1', amount: 120, date: [2019, 12, 24], trans_id: uuid.v4()}, 
      {customer_id: '2', amount: 70, date: [2020, 2, 13], trans_id: uuid.v4()},
      {customer_id: '3', amount: 55, date: [2020, 2, 11], trans_id: uuid.v4()},
      {customer_id: '1', amount: 65, date: [2020, 1, 15], trans_id: uuid.v4()},
      {customer_id: '2', amount: 80, date: [2020, 1, 12], trans_id: uuid.v4()},
      {customer_id: '3', amount: 135, date: [2020, 1, 13], trans_id: uuid.v4()},
      {customer_id: '2', amount: 130, date: [2019, 12, 6], trans_id: uuid.v4()},
      {customer_id: '1', amount: 130, date: [2019, 12, 8], trans_id: uuid.v4()}, 
      {customer_id: '2', amount: 70, date: [2019, 12, 3], trans_id: uuid.v4()},
      {customer_id: '3', amount: 55, date: [2020, 2, 12], trans_id: uuid.v4()},
      {customer_id: '1', amount: 65, date: [2020, 2, 9], trans_id: uuid.v4()},
      {customer_id: '2', amount: 80, date: [2020, 2, 7], trans_id: uuid.v4()},
      {customer_id: '3', amount: 135, date: [2019, 12, 22], trans_id: uuid.v4()},
      {customer_id: '2', amount: 130, date: [2019, 12, 27], trans_id: uuid.v4()}    
      ],
    customerSet: [],
    transactions: [],
    selectedCustomerId: '1',
    now: new Date()
  }

  componentDidMount() {
    const initalVals = this.getTransactions(this.state.selectedCustomerId)
    let updatedCustomerSet = new Set(this.state.data.map(customer => customer.customer_id))
    this.setState({transactions: initalVals, customerSet: Array.from(updatedCustomerSet)});
  }

  getTransactions(customerId){
      var filtered = [...this.state.data.filter(transaction => transaction.customer_id === customerId)]
      return filtered
    }

  updateSelectedCustomerId = (e) => {
    const newId = e.target.value
    const newVals = this.getTransactions(newId)
    this.setState({transactions: newVals, selectedCustomerId: newId});
    console.log("hello: " + this.state.customerSet)
  }  

  getStyle = () => {
    
    return {
      background: '#f4f4f4',
      padding: '10px',
      borderBottom: '1px #ccc dotted',
      textDecoration: 'none'
    } 
  }

  render() {
    return (
      <div className="Rewards">
      <Header />
      <div style={this.getStyle()}><h3>Select Customer:        
      <select onChange={this.updateSelectedCustomerId}>
        {this.state.customerSet.map((customer) => 
          <option key={customer} value={customer}>
            {customer}
          </option>)}
        }
      </select>
      </h3>
      </div>
      <Customer key={this.state.selectedCustomerId} transactions={this.state.transactions} now={this.state.now} selectedCustomerId={this.state.selectedCustomerId}/>
      </div>
    );
  }
}

export default App;
