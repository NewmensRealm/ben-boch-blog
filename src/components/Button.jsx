import React from "react";
import "../styles/styles.css";

export default function Button({ title, onClick }) {
	return (
		<button className='accessButton' onClick={onClick}>
			{title}
		</button>
	);
}
