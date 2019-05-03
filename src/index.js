import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { createStore } from 'redux';
import {Router, Route, Switch } from 'react-router-dom'

import history from './history'

import globalFunctions from './reducers';

import PrivateRoute from './containers/private-route'
import Login from './containers/login'

import App from './components/app'
import Home from './components/home'

import './helpers/css-variables.css';


const store = createStore(globalFunctions);

const render = () => {
	ReactDOM.render(
		<Provider store={store}>
    	<Router history={history}>
    		<Switch>
    			<Route path="/login" component={Login} />
                    <App>
                        <PrivateRoute path="/" component={Home} />
                    </App>
	      </Switch>
    	</Router>
  	</Provider>,
		document.getElementById('root')
	)
}

store.subscribe(render);
render();
