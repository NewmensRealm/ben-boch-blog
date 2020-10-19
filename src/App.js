import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import './styles/styles.css';
import Banner from './components/Banner';
import NavBar from './components/NavBar';
import Home from './components/Home';
import News from './components/News';
import Contact from './components/Contact';
import About from './components/About';

function App() {
	return (
		<>
			<Banner />
			<NavBar />
			<Switch>
				<Route path="/login" component={LoginForm} />
				<Route path="/register" component={RegisterForm} />
				<Route path="/home" component={Home} />
				<Route path="/news" component={News} />
				<Route path="/contact" component={Contact} />
				<Route path="/about" component={About} />
				<Redirect from="/" exact to="/home" />
			</Switch>
		</>
	);
}

export default App;
