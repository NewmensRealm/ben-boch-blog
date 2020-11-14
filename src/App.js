import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './styles/styles.css';
import Intro from './components/pages/Intro';
import Main from './components/pages/Main';
import LoginForm from './components/pages/LoginForm';
import RegisterForm from './components/pages/RegisterForm';

function App() {
	return (
		<Switch>
			<Route path="/intro" component={Intro} />
			<Route path="/main" component={Main} />
			<Route path="/login" component={LoginForm} />
			<Route path="/register" component={RegisterForm} />
			<Redirect from="/" exact to="/intro" />
		</Switch>
	);
}

export default App;
