/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
import { useEffect, useState } from "react";

import CartList from "@components/cart/cart-list";
import OrderSum from "@components/cart/order-sum";
import AppHeader from "@components/header/header";
// import { ILineItem } from "@interfaces/cart";

import { ICart } from "@interfaces/cart";
import getCart from "@services/get-cart";

import { Navigate } from "react-router-dom";

import { Box, Button, CircularProgress } from "@mui/material";

import EmptyCart from "../../components/cart/empty-cart";

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
        <Box className={styles.cartContainer}>
          <Button className="button" variant="contained" color="secondary">
            Clear cart
          </Button>
          <CartList products={basket.lineItems || []} />
          <OrderSum price={basket.totalPrice.centAmount} />
          <Button className="button" variant="contained" color="secondary">
            Payment and delivery
          </Button>
        </Box>
      ) : (
        <EmptyCart />
      )}
    </>
  );
};
export default Cart;
