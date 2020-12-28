import React from 'react';

export default function UserPropItem({ label, value }) {
	return (
		<div className="user-prop-item">
			<label>{label}</label>
			<label className="value">{value}</label>
		</div>
	);
}
