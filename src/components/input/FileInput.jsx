import React from 'react'
import Button from '../Button'

export default function FileInput({accept, refer, icon, placeholder}) {
    return (
        <div className='file-input-container'>
            {/*<Button icon={icon}/>
            <label for="file-upload" class="custom-file-upload">
                {placeholder}
    </label>*/}
            <input ref={refer} id="file-upload" className="file-input" type="file" accept={accept}/>
        </div>
    )
}
