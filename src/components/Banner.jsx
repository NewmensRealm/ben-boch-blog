import React from "react";
import "../styles/styles.css";
import Button from "./Button";

export default function Banner() {
	return (
		<div id='banner'>
			<div id='bannerImg'>
				<img
					src={require("../assets/images/bannerImg.jpg")}
					alt='Main banner logo'
				/>
			</div>
			<span>B.E.N. Boch</span>
			<div id='accessMenu'>
				<Button title='Log In' />
				<Button title='Register' />
			</div>
		</div>
	);
}
