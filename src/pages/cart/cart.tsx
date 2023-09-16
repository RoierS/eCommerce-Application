/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
import { useEffect, useState } from "react";

import CartList from "@components/cart/cart-list";
import OrderSum from "@components/cart/order-sum";
import AppHeader from "@components/header/header";

import getValidAccessToken from "@helpers/check-token";
import { ICart } from "@interfaces/cart";
import { changeLineItemQuantity, getCart } from "@services/cart-services";

import { Navigate } from "react-router-dom";

import { Box, Button, CircularProgress } from "@mui/material";

import EmptyCart from "../../components/cart/empty-cart";

import styles from "./cart.module.scss";

const Cart = () => {
  // State for active cart data
  const [basket, setBasket] = useState({} as ICart);

  // State to track when the data is currently being loaded
  const [isLoading, setLoading] = useState(true);

  // State to track when get error
  const [requestError, setError] = useState<boolean>(false);

  const changeProductQuantity = async (id: string, quantity: number) => {
    const cart = await changeLineItemQuantity(
      basket.id,
      basket.version,
      id,
      quantity
    );

    setBasket(cart);
  };

  useEffect(() => {
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
            className={styles.clearBtn}
            variant="contained"
            color="secondary"
          >
            Clear cart
          </Button>
          <CartList
            products={basket.lineItems || []}
            changeProductQuantity={changeProductQuantity}
          />
          <OrderSum
            price={basket.totalPrice.centAmount}
            version={basket.version}
            setBasket={setBasket}
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
