import React from 'react';
import {Link} from 'react-router-dom';
class Register extends React.Component { 
	state = {
		name: '',
		email: '',
		password: '',
		confirmPassword:'',
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
		let {name,email,password,confirmPassword,error} =this.state;
		return(
		<div className="row">
		<form className="col-sm-6 offset-sm-3 mt-3 " onsubmit={this.submitHandler}>
		<h1 className="text-center"> Register Here </h1>
			<div className="form-group">
				<label htmlFor='name'>Name: </label>
				<input 
				type='text'
				placeholder='Enter Your Name'
				className='form-control'
				name='name'
				value={name}
				onchange={this.changeHandler}
				 />
			</div>
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
			<div className="form-group">
				<label htmlFor='confirmPassword'>Confirm Password: </label>
				<input 
				type='password'
				placeholder='Confirm Your Password'
				className='form-control'
				name='confirmPassword'
				value={confirmPassword}
				onchange={this.changeHandler}
				 />
			</div>
			<div className ='d-flex justify-content-between '>
			<button className='btn btn-primary d-block'>Register </button>
			<Link to='/login'>Already have a account?? Login Here </Link>
			</div>
		</form>
		</div> 
		 )
	}
 }
export default Register;