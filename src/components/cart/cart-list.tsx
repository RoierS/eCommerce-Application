import { ILineItem } from "@interfaces/cart";

import { Stack } from "@mui/material";

import styles from "../../pages/cart/cart.module.scss";

import CartItem from "./cart-item";

interface ICartListProps {
  products: ILineItem[];
  changeProductQuantity: (id: string, quantity: number) => void;
}

const CartList = (props: ICartListProps) => {
  const { products, changeProductQuantity } = props;
  const cartItems = products.map((product) => {
    return (
      <CartItem
        key={product.productId}
        product={product}
        changeProductQuantity={changeProductQuantity}
      />
    );
  });

  return (
    <Stack spacing={2} className={styles.stack}>
      {cartItems}
    </Stack>
  );
};

export default CartList;
