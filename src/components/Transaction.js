import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Transaction extends Component {
	
	state = {
		points: 0
	}

	calculatePoints(){
		var transAmount = Math.floor(this.props.transaction.amount);
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

	render() {
		var trans = this.props.transaction
		var dateString = trans.date[1] + "/" + trans.date[2] + "/" + trans.date[0]
		return (   
				<>                                            
				<ul>Date: {dateString}</ul>
				<ul>Amount: {trans.amount}</ul>
				<ul>Points: {this.calculatePoints()}</ul>
				<br></br>
				</>
			);
		}
	}

	Transaction.propTypes = {
	transaction: PropTypes.object.isRequired, 
}

export default Transaction;