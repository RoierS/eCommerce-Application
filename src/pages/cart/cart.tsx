/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
import { useEffect, useState } from "react";

import CartList from "@components/cart/cart-list";
import OrderSum from "@components/cart/order-sum";
import AppHeader from "@components/header/header";

import getValidAccessToken from "@helpers/check-token";
import { ICart } from "@interfaces/cart";
import {
  changeLineItemQuantity,
  deleteCart,
  getCart,
} from "@services/cart-services";

import { Navigate } from "react-router-dom";

import { Box, Button, CircularProgress } from "@mui/material";

import EmptyCart from "../../components/cart/empty-cart";

import styles from "./cart.module.scss";

const Cart = () => {
  // State for active cart data
  const [basket, setBasket] = useState({} as ICart);

  // State to track if the data is currently loading
  const [isLoading, setLoading] = useState(true);

  // State to track error
  const [requestError, setError] = useState<boolean>(false);

  // State to disable all buttons when requests are sending
  const [buttonsDisabled, setButtonsDisabled] = useState(false);

  // Gets cart from server and saves it's state
  const loadBasket = async () => {
    try {
      const tokenObject = await getValidAccessToken();
      const cart: ICart = await getCart(tokenObject.access_token);
      setBasket(cart);
      setLoading(false);
    } catch {
      setError(true);
      setLoading(false);
    }
  };

  // Change product quantity in cart or delete product (if quantity is set to 0)
  const changeProductQuantity = async (id: string, quantity: number) => {
    setButtonsDisabled(true);

    const cart = await changeLineItemQuantity(
      basket.id,
      basket.version,
      id,
      quantity
    );

    setBasket(cart);
    setButtonsDisabled(false);
  };

  // Clears cart
  const clearCart = async () => {
    setButtonsDisabled(true);

    await deleteCart(basket.id, basket.version);
    await loadBasket();

    setButtonsDisabled(false);
  };

  useEffect(() => {
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
      ) : basket.lineItems.length ? (
        <Box className={styles.cartContainer}>
          <Button
            onClick={clearCart}
            className={styles.clearBtn}
            disabled={buttonsDisabled}
            variant="contained"
            color="secondary"
          >
            Clear cart
          </Button>
          <CartList
            products={basket.lineItems || []}
            changeProductQuantity={changeProductQuantity}
            disabled={buttonsDisabled}
          />
          <OrderSum
            price={basket.totalPrice.centAmount}
            version={basket.version}
            setBasket={setBasket}
            disabled={buttonsDisabled}
          />
          <Button
            className={styles.payBtn}
            variant="contained"
            color="secondary"
          >
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
