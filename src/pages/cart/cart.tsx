/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
import { useEffect, useState } from "react";

import CartList from "@components/cart/cart-list";
import AppHeader from "@components/header/header";
// import { ILineItem } from "@interfaces/cart";

import { ICart } from "@interfaces/cart";
import getCart from "@services/get-cart";

import { Navigate } from "react-router-dom";

import { Box, CircularProgress } from "@mui/material";

import EmptyCart from "./empty-cart";

import styles from "./cart.module.scss";

const Cart = () => {
  const [basket, setBasket] = useState({} as ICart);
  // State to track when the data is currently being loaded
  const [isLoading, setLoading] = useState(true);

  // State to track when get error
  const [requestError, setError] = useState<boolean>(false);

  useEffect(() => {
    const loadBasket = async () => {
      try {
        const cart: ICart = await getCart();
        setBasket(cart);
        setLoading(false);

        console.log("basket", basket);
        console.log("cart in cart page component", cart);
      } catch {
        setError(true);
        setLoading(false);
      }
    };

    loadBasket();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AppHeader />
      {isLoading ? (
        <Box className={styles.spinner}>
          <CircularProgress />
        </Box>
      ) : requestError ? (
        <Navigate to="*" />
      ) : basket.lineItems ? (
        <CartList products={basket.lineItems || []} />
      ) : (
        <EmptyCart />
      )}
    </>
  );
};
export default Cart;
