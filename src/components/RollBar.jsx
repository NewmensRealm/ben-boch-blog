import React, { useState } from 'react';
import Button from './utils/Button';

export default function RollBar({ icon, children }) {
	const [rolledOut, setRolledOut] = useState(false);
	return (
		<div className="rollbar">
			<Button icon={icon} onClick={() => setRolledOut(!rolledOut)} />
			<div className="rb-elems">{rolledOut && children}</div>
		</div>
	);
}
