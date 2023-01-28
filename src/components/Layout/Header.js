import React from 'react';
import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css'
import HeaderCartButton from './HeaderCartButton';

const  Header = (props) => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={props.onShowCart}/>
      </header>
      <div className={classes['main-image']}>
        {/* since it's a css class with a dash within it so we can't use it with "." operator here */}
        <img src={mealsImage} alt="A table full of delicious foods!" />
      </div>
    </React.Fragment>
  )
};

export default Header