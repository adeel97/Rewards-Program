import React, { Component } from 'react';
import Transaction from './Transaction'
import PropTypes from 'prop-types'

class Customer extends Component {
	state = {
		thisMonth: 2,
		lastMonth: 1,
		lastLastMonth: 12,
	}

	componentDidMount() {
		this.setState({thisMonth: this.props.now.getMonth() + 1})
		if (this.state.thisMonth === 2) {
			this.setState({lastMonth: 1, lastLastMonth: 12})
		} else if (this.state.thisMonth === 1) {
			this.setState({lastMonth: 12, lastLastMonth: 11})
		} else {
			this.setState({
				lastMonth: this.props.now.getMonth() - 1, 
				lastLastMonth: this.props.now.getMonth() -2 
			})
		}
	}

	getTransactionPoints(transAmount){
		var transPoints = 0;
		if (transAmount <= 50) {
			//do nothing
		} else if (transAmount > 50 && transAmount <= 100) {
			transPoints += (transAmount - 50);
		} else { // if amount is greater than 100
			transPoints += ((transAmount - 100)*2);
			transPoints += 50;
		}
		return transPoints;
	}
	
	getTotalPoints(){
		let points = 0;
		var transactions = this.props.transactions;
		for (let i=0; i<transactions.length; i++) {
			points += this.getTransactionPoints(transactions[i].amount)
		}
		return points;
	}

	getMonthTransactions(month) {
		var monthTransactions = [...this.props.transactions.filter(transaction => transaction.date[1] === month)]
		return monthTransactions
	}

	getMonthlyPoints(month){
		let monthPoints = 0;
		var monthTransactions = this.getMonthTransactions(month)
		monthTransactions.map(purchase => {
			monthPoints += this.getTransactionPoints(purchase.amount);
		})
		return monthPoints;
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
			<>
			<div style={this.getStyle()}>                                                   
			<h4> Customer ID:  {this.props.selectedCustomerId} </h4>
			<h4> Total Points: {this.getTotalPoints()} </h4>
			</div>
			
			<div style={this.getStyle()}>
			<h4> This Month: {this.getMonthlyPoints(this.state.thisMonth)} </h4>
			{[...this.props.transactions.filter(
				transaction => transaction.date[1] === this.state.thisMonth)].map((trans) => 
				<Transaction key={trans.trans_id} transaction={trans}/>
				)}
			</div>                                                   

			<div style={this.getStyle()}>
			<h4>Last Month: {this.getMonthlyPoints(this.state.lastMonth)}</h4>
			{[...this.props.transactions.filter(
					transaction => transaction.date[1] === this.state.lastMonth)].map(trans => 
				<Transaction key={trans.trans_id} transaction={trans}/>
				)}
			</div>

			<div style={this.getStyle()}>
			<h4>Two Months Ago: {this.getMonthlyPoints(this.state.lastLastMonth)}</h4>
			{[...this.props.transactions.filter(
				transaction => transaction.date[1] === this.state.lastLastMonth)].map(trans => 
				<Transaction key={trans.trans_id} transaction={trans}/>
				)}
			</div>
			</>
		);
	}
}

Customer.propTypes = {
	transactions: PropTypes.array.isRequired,
	selectedCustomerId: PropTypes.string.isRequired,
	now: PropTypes.object.isRequired
}

export default Customer;