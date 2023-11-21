import React from 'react'

import classes from './Input.module.css'

const Input = React.forwardRef((props, ref) => {  //forwardRef enables us to use ref property on custom components
    return(
        <div className={classes.input}>
            <label htmlFor={props.input.id}>{props.label}</label>
            <input ref={ref} {...props.input}/> {/* spread operator ensured type'text' for example */}
        </div>
    )
})

export default Input