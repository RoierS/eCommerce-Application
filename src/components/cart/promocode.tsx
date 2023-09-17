import { useState } from "react";

import { ICart } from "@interfaces/cart";

import { applyPromoCode } from "@services/cart-services";

import { Button, TextField } from "@mui/material";

import styles from "../../pages/cart/cart.module.scss";

interface IPromocodeProps {
  version: number;
  setBasket: (cart: ICart) => void;
  disabled: boolean;
  basketId: string;
}

const Promocode = (props: IPromocodeProps) => {
  const { version, setBasket, disabled, basketId } = props;
  const [promoCode, setPromoCode] = useState("");

  const handleApplyPromoCode = async () => {
    const response = await applyPromoCode(basketId, version, promoCode);
    setBasket(response);
  };

  return (
    <form className={styles.promocode}>
      <TextField
        className={styles.promoText}
        variant="outlined"
        label="Promo Code"
        value={promoCode}
        onChange={(e) => setPromoCode(e.target.value)}
      />
      <Button
        disabled={disabled}
        className={styles.promoBtn}
        variant="contained"
        color="info"
        onClick={handleApplyPromoCode}
      >
        Apply promo code
      </Button>
    </form>
  );
};

export default Promocode;
