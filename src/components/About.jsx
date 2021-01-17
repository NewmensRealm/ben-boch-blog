import React from 'react';
import img from '../assets/images/about_img.jpg';
import Header from './Header';

export default function About() {
	return (
		<div>
			<div className="about-container">
				<img src={img} className="about-img" alt="B.E.N. Boch" />
				<Header title="B.E.N. Boch" styles={{ color: 'black' }} />
				<div className="text-container">
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Cumque cupiditate illo, itaque ullam deleniti ut quasi
						amet a, dolore pariatur similique nulla modi minima
						dignissimos nostrum perferendis voluptas? Qui, suscipit?
					</p>
					<p>
						Lorem ipsum dolor sit amet consectetur, adipisicing
						elit. Sequi nobis ad, nesciunt delectus quo expedita
						impedit culpa, doloribus dolor modi aperiam nostrum
						aspernatur vitae itaque. Quod, autem! Officia,
						reiciendis veniam?
					</p>
				</div>
			</div>
		</div>
	);
}
