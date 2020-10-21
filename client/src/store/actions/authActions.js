import Axios from 'axios';
import * as Types from './types';

export const register= (user,history) => dispatch => {
	Axios.post('/api/users/register',user)
	.then(res => {
		dispatch({
			type:Types.USERS_ERROR,
			payload: {
				error:{}
			}
		})
		history.push('/login')
	})
	.catch(error => {
		console.log(error);
		dispatch({
			type:Types.USERS_ERROR,
			payload:{
				error:error.response.data
			}
		})  
	})
}