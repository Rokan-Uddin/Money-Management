import React from 'react'
import { connect } from 'react-redux'
import { loadTransaction,removeTransaction } from '../store/actions/transactionAction'
import CreateTransaction from './CreateTransaction';
import UpdateTransaction from './UpdateTransaction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit,faPlus } from '@fortawesome/free-solid-svg-icons'

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
    openUpdateModal = (id) => {
        this.setState({
            updateModalOpen: true,
            id
        })
    }

    closeUpdateModal = () => {
        this.setState({
            updateModalOpen: false,
            id: ''
        })
    }

    componentDidMount() {
        this.props.loadTransaction()
    }

    render() {
        let {auth, transactions} = this.props
        return (
            <div className="row mb-5">
                <CreateTransaction
                        isOpen={this.state.createModalOpen}
                        close={this.closeCreateModal}
                 />

                <div className="col-12 col-sm-8 offset-sm-2 mt-3">
                <div className='d-flex justify-content-between my-2'>
                <h3 className='text-center my-2'>All Transactions</h3>
                <button className='btn btn-primary' onClick={this.openCreateModal}>
                        <FontAwesomeIcon icon={faPlus} />
                </button>
                </div>
                    <i className="fas fa-ad"></i>                   
                    {transactions.length > 0 ? <ul className='list-group'>
                        {
                            transactions.map(transaction => (
                                <li
                                    key={transaction._id}
                                    className='list-group-item'>
                                   
                                    <div className='row'>
                                    <div className='col-6 col-sm-6'>
                                        <p>Type: {transaction.type}</p>
                                        <p>Amount: {transaction.amount}</p>
                                        <p>Notes: {transaction.note} </p>
                                    </div>
                                    <div className='col-1 offset-3 col-sm-1 offset-sm-5'>
                                        {
                                        this.state.id === transaction._id ? 
                                        <UpdateTransaction
                                            isOpen={this.state.updateModalOpen}
                                            close={this.closeUpdateModal}
                                            transaction={transaction}
                                        /> : null 
                                        }
                                    <div className='btn-group-vertical mt-3'>
                                        <button className='btn btn-danger' onClick={()=> {
                                            this.props.removeTransaction({id:transaction._id})
                                            
                                        }}> <FontAwesomeIcon icon={faTrash} /></button>
                                   
                                        <button className='btn btn-success' onClick={()=> {
                                            this.openUpdateModal(transaction._id)
                                            
                                        }}><FontAwesomeIcon icon={faEdit} /></button>
                                   </div>
                                    </div>
                                    </div>
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