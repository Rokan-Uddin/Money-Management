import React from 'react'
import { connect } from 'react-redux'
import { loadTransaction,removeTransaction } from '../store/actions/transactionAction'
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
        this.props.loadTransaction()
    }

    render() {
        let {auth, transactions} = this.props
        return (
            <div className="row">
                <CreateTransaction
                        isOpen={this.state.createModalOpen}
                        close={this.closeCreateModal}
                 />
                <div className="col-md-8 offset-md-2">
                    <h1 className="text-center">Welcome {auth.user.name} </h1>
                    <p className='text-center'>You Balance is {auth.user.balance} </p>
                    <div className='row'>
                    <h1 className='col-sm-4'>Transactions: </h1>
                    <button
                        className='btn btn-primary col-sm-4 offset-sm-2'
                        onClick={this.openCreateModal}
                    >
                        Create New Transaction
                    </button>
                    </div>
                    {transactions.length > 0 ? <ul className='list-group'>
                        {
                            transactions.map(transaction => (
                                <li
                                    key={transaction._id}
                                    className='list-group-item'>
                                    <p>Type: {transaction.type}</p>
                                    <p>Amount: {transaction.amount}</p>
                                    <button onClick={()=> {
                                        this.props.removeTransaction({id:transaction._id})
                                        
                                    }}>Remove</button>
                                </li>
                            ))
                        }
                    </ul> : <p>There is no transaction</p>}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    transactions: state.transactions
})

export default connect(mapStateToProps, { loadTransaction, removeTransaction })(Dashboard)