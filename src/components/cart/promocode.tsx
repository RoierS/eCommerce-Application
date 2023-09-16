import { ICart } from "@interfaces/cart";

import { Button, TextField } from "@mui/material";

import styles from "../../pages/cart/cart.module.scss";

interface IPromocodeProps {
  version: number;
  setBasket: (cart: ICart) => void;
}

const Promocode = (props: IPromocodeProps) => {
  const { version, setBasket } = props;
  // eslint-disable-next-line no-console
  console.log("cart version for server request", version, setBasket);

  // TODO setBasket(response.data); to set actual state of cart on cart-page
  return (
    <form className={styles.promocode}>
      <TextField
        className={styles.promoText}
        variant="outlined"
        label="Promo Code"
      />
      <Button className={styles.promoBtn} variant="contained" color="info">
        Apply promo code
      </Button>
    </form>
  );
};

export default Promocode;
