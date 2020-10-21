import React from "react";

export default function GalleryItem({ title, classes }) {
	return (
		<div className={`gallery ${classes}`}>
			<h1 className='gal-header'>{title}</h1>
		</div>
	);
}
