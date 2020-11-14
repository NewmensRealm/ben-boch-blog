import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Banner from '../Banner';
import NavBar from '../NavBar';
import Home from '../Home';
import Gallery from '../Gallery';
import Contact from '../Contact';
import About from '../About';

export default function Main() {
	return (
		<>
			<Banner />
			<NavBar />
			<Switch>
				<Route path="/main/home" component={Home} />
				<Route path="/main/gallery" component={Gallery} />
				<Route path="/main/contact" component={Contact} />
				<Route path="/main/about" component={About} />
				<Redirect from="/main" exact to="/main/home" />
			</Switch>
		</>
	);
}
