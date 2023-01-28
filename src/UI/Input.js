import React from 'react'
import classes from './Input.module.css'

//if we want to use ref in a custom component then we need to use forwardRef in that component, passing ref as a prop in a custom component doesn't work.
const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref= {ref} {...props.input}/>
    </div>
  )
});

export default Input