
import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {register} from '../store/actions/authActions';
class Register extends React.Component { 
	state = {
		name: '',
		email: '',
		password: '',
		confirmPassword:'',
		error: {}
	}

	static getDerivedStateFromProps(nextProps,prevState) {
		if(JSON.stringify(nextProps.auth.error) != JSON.stringify(prevState.error)) {
			return {
				error:nextProps.auth.error
			}
		}
		return null
	}

	changeHandler = event => {
		this.setState({
			[event.target.name] : event.target.value
		})
	}

	submitHandler = event => {
		event.preventDefault();
		let {name,email,password,confirmPassword} =this.state;
		this.props.register({name,email,password,confirmPassword},this.props.history)
	}
	render() {
		console.log(this.props);
		let {name,email,password,confirmPassword,error} =this.state;
		return(
		<div className="row">
		<form className="col-sm-6 offset-sm-3 mt-3 " onSubmit={this.submitHandler}>
		<h1 className="text-center"> Register Here </h1>
			<div className="form-group">
				<label htmlFor='name'>Name: </label>
				<input 
				type='text'
				placeholder='Enter Your Name'
				className={error.name ? 'form-control is-invalid' : 'form-control'}
				name='name'
				value={name}
				onChange={this.changeHandler}
				 />
				 { error.name && <div className='invalid-feedback'>
				 	{error.name}
				 </div> }
			</div>
			<div className="form-group">
				<label htmlFor='email'>Email : </label>
				<input 
				type='text'
				placeholder='Enter Your Email'
				className={error.email ? 'form-control is-invalid' : 'form-control'}
				name='email'
				value={email}
				onChange={this.changeHandler}
				 />
				{ error.email && <div className='invalid-feedback'>
				 	{error.email}
				</div>  }
			</div>
			<div className="form-group">
				<label htmlFor='password'>Password: </label>
				<input 
				type='password'
				placeholder='Enter Your Password'
				className={error.password ? 'form-control is-invalid' : 'form-control'}
				name='password'
				value={password}
				onChange={this.changeHandler}
				 />
				{ error.password &&  <div className='invalid-feedback'>
				 	{error.password}
				</div>  }
			</div>
			<div className="form-group">
				<label htmlFor='confirmPassword'>Confirm Password: </label>
				<input 
				type='password'
				placeholder='Confirm Your Password'
				className={error.confirmPassword ? 'form-control is-invalid' : 'form-control'}
				name='confirmPassword'
				value={confirmPassword}
				onChange={this.changeHandler}
				 />
				{error.confirmPassword && <div className='invalid-feedback'>
				 	{error.confirmPassword}
				</div> }
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

const mapStateToProps = state => ({
	auth:state.auth
})

export default connect(mapStateToProps,{register})(Register);