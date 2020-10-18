import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Banner from './components/Banner';
import NavBar from './components/NavBar';
import './styles/styles.css';

function App() {
	return (
		<>
			<NavBar />
			<Banner />
			<Switch></Switch>
		</>
	);
}

export default App;
