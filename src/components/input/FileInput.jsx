import React from 'react';
import Warning from '../utils/Warning';

export default function FileInput({
	accept,
	refer,
	icon,
	placeholder,
	onChange,
	styles,
	error,
}) {
	return (
		<>
			<div className="file-input-container">
				{/*<Button icon={icon}/>
            <label for="file-upload" class="custom-file-upload">
                {placeholder}
    </label>*/}
				<input
					ref={refer}
					id="file-upload"
					className="file-input"
					type="file"
					accept={accept}
					onChange={onChange}
					style={styles}
				/>
			</div>
			<Warning message={error} />
		</>
	);
}
