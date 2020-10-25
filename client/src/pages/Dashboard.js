import React from 'react';
import {connect } from 'react-redux';
import {loadTransaction} from '../store/actions/transactionAction';
import CreateTransaction from './CreateTransaction';
class Dashboard extends React.Component {
    state = {
        createModalOpen: false,
        updateModalOpen: false,
        id: ''
    }

    openCreateModal = () => {
        this.setState({
            createModalOpen: true
        })
    }

    closeCreateModal = () => {
        this.setState({
            createModalOpen: false
        })
    }

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
					<div className="row">
					<h3 className='col-sm-6'>Transactions List </h3>
					<button 
					className="col-sm-3 offset-sm-3 btn btn-primary"
					onClick={this.openCreateModal}
					>Add Transactions </button>
					<CreateTransaction
						className="row"
                        isOpen={this.state.createModalOpen}
                        close={this.closeCreateModal}
                    />
					</div>
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