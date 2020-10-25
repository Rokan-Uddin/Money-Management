import React from 'react'
import Modal from 'react-modal'

class CreateTransaction extends React.Component {

    state = {
        amount: 0,
        type: '',
        note: ''
    }

    render() {
        let { amount, note } = this.state
        return (
            <Modal
                className="col-sm-6 offset-sm-3 bg-dark p-5"   
                isOpen={this.props.isOpen}
                onRequestClose={this.props.close}
                contentLabel='Create A New Transaction'
            >
                <h2 className="text-white">Create A New Transaction</h2>
                <form onSubmit={this.submitHandler}>
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

export default CreateTransaction
