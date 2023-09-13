import { ILineItem } from "@interfaces/cart";

import { Stack } from "@mui/material";

import CartItem from "./cart-item";

import styles from "./cart.module.scss";

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
