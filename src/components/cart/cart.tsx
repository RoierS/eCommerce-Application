import React from "react";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Button from "@mui/material/Button";

import styles from "./cart.module.scss";

const Cart = () => {
  return (
    <div className={styles.cart}>
      <Button
        variant="contained"
        size="large"
        endIcon={<ShoppingCartOutlinedIcon />}
      >
        Add to cart
      </Button>
    </div>
  );
};
export default Cart;
