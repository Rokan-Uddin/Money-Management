import React from 'react';
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { updateTransaction } from '../store/actions/transactionAction'


class UpdateTransaction extends React.Component {

    state = {
        amount: 0,
        note: '',
        type: ''
    }

    componentDidMount() {
        this.setState({
            amount: this.props.transaction.amount,
            note: this.props.transaction.note,
            type: this.props.transaction.type
        })
    }

    changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitHandler = event => {
        event.preventDefault()
        this.props.updateTransaction(this.props.transaction._id, this.state)
        this.props.close()
    }

    render() {
        let { amount, note,type } = this.state
        return (
            <Modal
                isOpen={this.props.isOpen}
                onRequestClose={this.props.close}
                contentLabel='Create A New Transaction'
                className='row mt-4'
                areaHideApp={false}
            >
                
                <form className='col-sm-6 offset-sm-3 bg-dark text-white' onSubmit={this.submitHandler}>
                <h2 className='text-center'>Create A New Transaction</h2>
                    <div className='form-group'>
                        <label htmlFor='amount'> Amount: </label>
                            <input
                                type="number"
                                className='form-control'
                                placeholder="Enter Amount"
                                name='amount'
                                id='amount'
                                value={amount}
                                onChange={this.changeHandler}
                            />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='type'> Type: </label>
                        <select
                            className='form-control'
                            onChange={this.changeHandler}
                            name='type'
                            value={type}
                        >
                            <option> Select A Type </option>
                            <option value="expense"> Expense </option>
                            <option value="income">Income</option>
                        </select>
                            
                    </div>
                    <div className='form-group'>
                        <label htmlFor='note'> Amount: </label>
                            <textarea
                                className='form-control'
                                placeholder="Enter a Note"
                                name='note'
                                id='note'
                                value={note}
                                onChange={this.changeHandler}
                            />
                    </div>
                    <button className='btn btn-primary'>Submit</button>
                </form>
            </Modal>
        )
    }
}

export default connect(null, { updateTransaction })(UpdateTransaction)