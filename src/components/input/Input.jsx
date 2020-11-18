import React from 'react'

export default function Input({type, placeholder, refer}) {
    return (
        <div className="input-container" >
            <input ref={refer} className='basic-input' type={type} placeholder={placeholder}/>
        </div>
    )
}
