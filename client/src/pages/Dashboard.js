import React from 'react';
import {connect } from 'react-redux';
import {loadTransaction} from '../store/actions/transactionAction';

class Dashboard extends React.Component {
	componentDidMount() {
		this.props.loadTransaction();
	}
	render() {
		let {auth,transactions} = this.props;

		return ( 
			<div className="row">
				<div className='col-sm-8 offset-sm-2'>
					<h3 className='text-center'>Wellcome {auth.user.name} </h3>
					<h5 className='text-center'>Your Total Balance : {auth.user.balance} </h5>
					<br />
					<h3>Transactions List </h3>
					<ul className="list-group">
						{
							transactions.map(transaction=>( 
								<li
								key={transaction._id} 
								className='list-group-item'
								 >
								 <p className='text-center' >Type : {transaction.type} </p>
								 <p className='text-center'>Amount : {transaction.amount} </p>
									
								</li>
							))
						}
					</ul>
				</div>
			</div>
		)
	}
}


const mapStateToProps = state => ({
	auth: state.auth, 
	transactions: state.transactions
})
export default connect(mapStateToProps,{loadTransaction})(Dashboard);