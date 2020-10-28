import React from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {logout} from '../store/actions/authActions'

class Navigation extends React.Component {

    render() {
        return (
            <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
                <Link to='/'>
                    <span className='navbar-brand'>Money Management</span>
                </Link>            
                          <button 
                          className="navbar-toggler" 
                          type="button" 
                          data-toggle="collapse" 
                          data-target="#navbarTogglerDemo03" 
                          aria-controls="navbarTogglerDemo03" 
                          aria-expanded="false" 
                          aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                          </button>                       
                    
                    <div className='collapse navbar-collapse' id="navbarTogglerDemo03">
                    <ul className='navbar-nav mr-auto mt-2 mt-lg-0'>

                        {
                            this.props.auth.isAuthenticated ? 
                                <React.Fragment>
                                    <li className='nav-item'>
                                        <NavLink to='/' activeClassName='active' exact>
                                            <span className='nav-link'>
                                                Home
                                            </span>
                                        </NavLink>
                                     </li>
                                    <li className='nav-item'>
                                        <NavLink to='/dashboard' activeClassName='active'>
                                            <span className='nav-link'>
                                                Dashboard
                                            </span>
                                        </NavLink>
                                    </li>
                                    <li className='nav-item'>
                                    <button
                                        className='btn'
                                        onClick={() => this.props.logout(this.props.history)}
                                    >
                                        Logout
                                    </button>
                                    </li>
                                </React.Fragment>
                                : <React.Fragment>
                                    <li className='nav-item'>
                                        <NavLink to='/login' activeClassName='active'>
                                            <span className='nav-link'>
                                                Login
                                            </span>
                                        </NavLink>
                                    </li>
                                    <li className='nav-item'>
                                        <NavLink to='/register' activeClassName='active'>
                                            <span className='nav-link'>
                                                Register
                                            </span>
                                        </NavLink>
                                    </li>
                                </React.Fragment>
                        }

                    </ul>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {logout})(withRouter(Navigation))