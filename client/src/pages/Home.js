import React from 'react';
import {connect} from 'react-redux';
import {logout} from '../store/actions/authActions';
class Home extends React.Component {
	render() {
		let {auth} = this.props
		return( 

			<div className='row'>
				<div className='card col-sm-6 offset-sm-3 mt-5'>
                    <div className='card-body'>
                        <h3 className='text-center card-title'>
                            {auth.user.name}
                        </h3>
                        <hr />
                        <h5 className='card-text text-center text-primary'>{`Current Balance: ${auth.user.balance}`}</h5>
                        <p className='card-text text-center text-success'>{`Total Income: ${auth.user.income}`}</p>
                        <p className='card-text text-center text-danger'>{`Total Expense: ${auth.user.expense}`}</p>
                        <p className='card-text text-center text-secondary'>{`Total Transactions: ${auth.user.transactions.length}`}</p>
                    </div>
                </div>

			</div>
		 );
	}
}
const mapStateToProps = state => ({
	auth:state.auth
})
export default connect(mapStateToProps,{logout})(Home);