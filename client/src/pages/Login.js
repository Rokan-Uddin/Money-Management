import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {login} from '../store/actions/authActions';
class Login extends React.Component { 
	state = {
		email: '',
		password: '',
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
		let {email,password} =this.state;
		this.props.login({email,password},this.props.history)
	}
	render() {

		let {email,password,error} =this.state;
		return(
		<div className="row">
		<form className="col-sm-6 offset-sm-3 mt-3 " onSubmit={this.submitHandler}>
		<h1 className="text-center"> Login Here </h1>

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
				{ error.password && <div className='invalid-feedback'>
				 	{error.password}
				</div>  }
			</div>
			<div className='d-flex justify-content-between'>
			<button className='btn btn-primary d-block'>Login</button>
			<Link to='/register'>Don't have a account?? </Link>
			</div>
		</form>
		</div> 
		 )
	}
 }
 const mapStateToProps = state => ({
	auth:state.auth
})

export default connect(mapStateToProps,{login})(Login);