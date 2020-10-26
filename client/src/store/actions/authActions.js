import Axios from 'axios';
import * as Types from './types';
import jwtDecode from 'jwt-decode';
import setTokenHeader from '../../utils/setTokenHeader';
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

export const login= (user,history) => dispatch => {
	Axios.post('/api/users/login',user)
	.then(res => {
		let token=res.data.token
		localStorage.setItem('auth_token',token);
		setTokenHeader(token);
		let decode=jwtDecode(token)
		console.log(decode);
		dispatch({
			type:Types.SET_USER,
			payload:{
				user:decode
			}
		})
		history.push('/')
	})
	.catch(error => {
		console.log("Error :")
		console.log(error);
		dispatch({
			type:Types.USERS_ERROR,
			payload:{
				error:error.response.data
			}
		})  
	})
}
export const logout = history => {
	localStorage.removeItem('auth_token')
	history.push('/login')
	return {
		type:Types.SET_USER,
		payload:{
			user:{}
		}
	}
}