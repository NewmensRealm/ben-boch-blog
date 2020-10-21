import React from "react";
import GalleryItem from "./GalleryItem";

export default function Gallery() {
	return (
		<div className='grid-container'>
			<GalleryItem title='Lore' classes='box1' />
			<GalleryItem title='Characters' classes='long-hor1' />
			<GalleryItem title='Nations' classes='long-hor2' />
			<GalleryItem title='Creatures' classes='long-ver' />
			<GalleryItem title='Magic' classes='box2' />
			<GalleryItem title='Orders' classes='box3' />
		</div>
	);
}
