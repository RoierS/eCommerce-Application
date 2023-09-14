import React, { useState } from "react";

import { ICartResponse } from "@interfaces/get-cart";
import { IProductResponse } from "@interfaces/product-response";
import addProductToCart from "@services/add-product-to-cart";
import getCartByCustomerId from "@services/get-cart-by-customer-id";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Button from "@mui/material/Button";

import styles from "./cart-button.module.scss";

const CartButton = ({
  product,
  active,
}: {
  product: IProductResponse;
  active: boolean;
}) => {
  // State to toggle button activity
  const [activeState, setActiveState] = useState(active);

  // Event handler for adding a product to the cart
  const handleAddToCartClick = async () => {
    try {
      const cart: ICartResponse = await getCartByCustomerId();
      await addProductToCart(product, cart);
      setActiveState(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };
  return (
    <div className={styles.cart}>
      {activeState ? (
        <Button
          variant="contained"
          size="large"
          endIcon={<ShoppingCartOutlinedIcon />}
          onClick={handleAddToCartClick}
          disabled={false}
        >
          Add to cart
        </Button>
      ) : (
        <Button
          variant="contained"
          size="large"
          endIcon={<ShoppingCartOutlinedIcon />}
          onClick={handleAddToCartClick}
          disabled
        >
          Add to cart
        </Button>
      )}
    </div>
  );
};
export default CartButton;
