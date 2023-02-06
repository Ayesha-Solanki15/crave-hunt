
import React, {useState} from 'react';
import Cart from './components/Cart/Cart';

import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import CartProvider from './store/CartProvider';

function App() {
const [cartIsShown, setCartIsShown] = useState(false);

const showCartHandler = () => {
  setCartIsShown(true);
}
const hideCartHandler = () => {
  setCartIsShown(false);
}

  return (
    <CartProvider>
      {/* the convention for the props that holds a function is to start with on */}
      <Header onShowCart={showCartHandler}/>
      <main>
        <Meals/>
      </main>
      {cartIsShown && <Cart onClose={hideCartHandler}/>}
    </CartProvider>   
  );
}

export default App;
