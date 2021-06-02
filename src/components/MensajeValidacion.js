import React from 'react'

export default function MensajeValidacion(props) {
    return (
        <span className={ props.validator.valid ? 'success' : 'alert' }>
            &nbsp;{props.validator.message}
        </span>
    )
} 
