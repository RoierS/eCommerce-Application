/* eslint-disable no-console */
import { useEffect, useState } from "react";

import CartList from "@components/cart/cart-list";
import AppHeader from "@components/header/header";
// import { ILineItem } from "@interfaces/cart";

import { ICart } from "@interfaces/cart";
import getCart from "@services/get-cart";

const Cart = () => {
  const [basket, setBasket] = useState({} as ICart);

  useEffect(() => {
    const loadBasket = async () => {
      const cart: ICart = await getCart();
      setBasket(cart);

      console.log("basket", basket);
      console.log("cart in cart page component", cart);
    };

    loadBasket();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AppHeader />
      <CartList products={basket.lineItems || []} />
    </>
  );
};
export default Cart;
