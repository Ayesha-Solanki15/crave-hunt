import React , {useContext, useEffect, useState} from 'react'
import CartIcon from '../Cart/CartIcon'
import CartContext from '../../store/cartContext';
import classes from './HeaderCartButton.module.css'

function HeaderCartButton(props) {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);

  const {items} = cartCtx;//destructuring because we only want to bump class to get added if the items of cartCtx gets updated and not all

  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0)

  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''} `
  //to add the animation
  useEffect(() => {
    if(cartCtx.items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);
    const timer = setTimeout( () => {
      setBtnIsHighlighted(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    }
  },[items]);
  
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
       <CartIcon/> 
      </span>
      <span>Your cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  )
}

export default HeaderCartButton