import React from 'react';
import './App.css';
import {BrowserRouter,Route,Switch} from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import {Provider} from 'react-redux';
import store from './store/index';
function App() {
  return (
  	<Provider store={store} >
  	<BrowserRouter>
    <div>
    <Switch>
    	 <Route path='/' exact  component={Home} />
       <Route path='/login' component={Login} />
       <Route path='/register' component={Register} />
    </Switch>
    </div>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
