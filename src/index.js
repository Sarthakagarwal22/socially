import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { createStore } from 'redux';
import {Router, Route, Switch, Redirect } from 'react-router-dom'

import history from './history'

import globalFunctions from './reducers';

import PrivateRoute from './containers/private-route'
import Login from './containers/login'
import PostDetail from './containers/post-detail';
import DeletedPosts from './containers/deleted-posts'

import App from './components/app'
import Home from './containers/home'

import './helpers/css-variables.css';


const store = createStore(globalFunctions);

const render = () => {
	ReactDOM.render(
		<Provider store={store}>
    	<Router history={history}>
    		<Switch>
    			<Route path="/login" component={Login} />
                    <App>
                        <PrivateRoute exact path="/" render = {() => <Redirect to = {{pathname: "/login"}} />}/>
                        <PrivateRoute path="/home" component={Home} />
                        <PrivateRoute path="/posts/:id" component={PostDetail} />
                        <PrivateRoute path="/deleted-posts" component={DeletedPosts} />
                    </App>
	      </Switch>
    	</Router>
  	</Provider>,
		document.getElementById('root')
	)
}

store.subscribe(render);
render();
