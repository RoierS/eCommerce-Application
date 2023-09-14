import { ILineItem } from "@interfaces/cart";

import { Stack } from "@mui/material";

import styles from "../../pages/cart/cart.module.scss";

import CartItem from "./cart-item";

const CartList = (props: { products: ILineItem[] }) => {
  const { products } = props;
  const cartItems = products.map((product) => {
    return <CartItem key={product.productId} product={product} />;
  });

  return (
    <Stack spacing={2} className={styles.stack}>
      {cartItems}
    </Stack>
  );
};

export default CartList;
