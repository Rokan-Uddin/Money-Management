import Axios from 'axios';
import * as Types from './types';

export const loadTransaction = () => dispatch => {
	Axios.get('/api/transactions')
	.then(response=> {
		dispatch({
			type: Types.LOAD_TRANSACTIONS,
			payload : {
				transactions: response.data
			}
		})
	})
	.catch(err=> console.log(err))
}
export const addNewTransaction = transaction => dispatch => {
    Axios.post('/api/transactions/', transaction)
        .then(response => {
            dispatch({type: Types.CREATE_TRANSACTION, payload: { transaction: response.data}})
            dispatch({type:Types.SET_USER, payload: {user:response.data.user}})

        })
        .catch(error => {
            console.log(error)
        })
}

export const removeTransaction = id => dispatch => {
	
    Axios.delete(`/api/transactions/${id.id}`)
        .then(response => {
			dispatch({type: Types.REMOVE_TRANSACTION, payload: {id: id.id}})            
        })
        .catch(error => {
            console.log(error)
        })
}