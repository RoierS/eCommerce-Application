import React from "react";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Button from "@mui/material/Button";

import styles from "./cart-button.module.scss";

const CartButton = ({
  active,
  clickCallback,
}: {
  active: boolean;
  clickCallback: () => void;
}) => {
  return (
    <div className={styles.cart}>
      {active ? (
        <Button
          variant="contained"
          size="large"
          endIcon={<ShoppingCartOutlinedIcon />}
          onClick={() => {
            clickCallback();
          }}
          disabled={false}
        >
          Add to cart
        </Button>
      ) : (
        <Button
          variant="contained"
          size="large"
          endIcon={<ShoppingCartOutlinedIcon />}
          onClick={() => {
            clickCallback();
          }}
          disabled
        >
          Add to cart
        </Button>
      )}
    </div>
  );
};
export default CartButton;
