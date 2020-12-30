import React, { useState } from 'react';
import FileInput from '../input/FileInput';
import Input from '../input/Input';
import Button from './Button';

export default function EditButton({
	icon,
	fileInput,
	accept,
	onChange,
	placeholder,
}) {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<div className="edit-btn">
			<Button icon={icon} onClick={() => setIsOpen(!isOpen)} />
			{isOpen &&
				(fileInput ? (
					<FileInput
						accept={accept}
						onChange={onChange}
						styles={{ color: 'white' }}
					/>
				) : (
					<Input
						type="text"
						placeholder={placeholder}
						onChange={onChange}
					/>
				))}
		</div>
	);
}
