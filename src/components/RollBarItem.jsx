import React from 'react';
import { Link } from 'react-router-dom';

export default function RollBarItem({ destination, icon }) {
	return (
		<Link to={destination} className="rb-item">
			<i className={icon} />
		</Link>
	);
}
