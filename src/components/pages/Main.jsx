import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Banner from '../sidebar/Banner';
import NavBar from '../sidebar/NavBar';
import Home from '../Home';
import Gallery from '../Gallery';
import Contact from '../Contact';
import About from '../About';
import TopBar from '../TopBar';

export default function Main() {
	return (
		<div className="main-container">
			<div className="sidebar-container">
				<Banner />
				<NavBar />
			</div>
			<div className="content-container">
				<TopBar />
				<Switch>
					<Route path="/main/home" component={Home} />
					<Route path="/main/gallery" component={Gallery} />
					<Route path="/main/contact" component={Contact} />
					<Route path="/main/about" component={About} />
					<Redirect from="/main" exact to="/main/home" />
				</Switch>
			</div>
		</div>
	);
}
