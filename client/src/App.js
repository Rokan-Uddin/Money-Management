import React from 'react';
import './App.css';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Navigation from './pages/Navigation'
import CreateTransaction from './pages/CreateTransaction'
import {Provider} from 'react-redux';
import store from './store/index';

import jwtDecode from 'jwt-decode';
import * as Types from './store/actions/types';
import setTokenHeader from './utils/setTokenHeader';

const token=localStorage.getItem('auth_token')
if(token) {
  let decode = jwtDecode(token);
  setTokenHeader(token);
  store.dispatch({
    type:Types.SET_USER,
    payload:{
      user:decode
    }
  })
}

function App() {
  return (
  	<Provider store={store} >
  	<BrowserRouter>
    <div className="container">
    <Navigation />
    <Switch>
    	 <Route path='/' exact  component={Home} />
       <Route path='/login' component={Login} />
       <Route path='/register' component={Register} />
       <Route path='/dashboard' component={Dashboard} />
       <Route path='/create' component={CreateTransaction} />
    </Switch>
    </div>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
