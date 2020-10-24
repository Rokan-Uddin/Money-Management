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