import React from 'react';
import {Link} from 'react-router-dom';
class Login extends React.Component { 
	state = {
		email: '',
		password: '',
		error: {}
	}

	changeHandler = event => {
		this.state({
			[event.target.name] : event.target.value
		})
	}

	submitHandler = event => {
		event.preventDefault();
	}
	render() {
		let {email,password,error} =this.state;
		return(
		<div className="row">
		<form className="col-sm-6 offset-sm-3 mt-3 " onsubmit={this.submitHandler}>
		<h1 className="text-center"> Login Here </h1>

			<div className="form-group">
				<label htmlFor='email'>Email : </label>
				<input 
				type='text'
				placeholder='Enter Your Email'
				className='form-control'
				name='email'
				value={email}
				onchange={this.changeHandler}
				 />
			</div>
			<div className="form-group">
				<label htmlFor='password'>Password: </label>
				<input 
				type='password'
				placeholder='Enter Your Password'
				className='form-control'
				name='password'
				value={password}
				onchange={this.changeHandler}
				 />
			</div>
			<div className='d-flex justify-content-between'>
			<div className='btn btn-primary'>Login </div>
			<Link to='/register'>Don't have a account?? </Link>
			</div>
		</form>
		</div> 
		 )
	}
 }
export default Login;