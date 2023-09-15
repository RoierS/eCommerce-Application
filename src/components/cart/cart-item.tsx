// import { useState } from "react";

import { ILineItem } from "@interfaces/cart";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import {
  Box,
  IconButton,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import styles from "../../pages/cart/cart.module.scss";

const CartItem = (props: { product: ILineItem }) => {
  const theme = useTheme();
  const large = useMediaQuery(theme.breakpoints.up("lg"));
  const medium = useMediaQuery(theme.breakpoints.up("md"));

  const { product } = props;
  // const [quantity, setQuantity] = useState(1);

  return (
    <Paper className={styles.paper} elevation={2}>
      <Typography
        variant={large || medium ? "subtitle1" : "subtitle2"}
        color="primary"
        className={styles.title}
      >
        {product.productKey}
      </Typography>
      <img
        src={product.variant.images[0].url}
        alt="hotel"
        className={styles.image}
      />
      <Box className={styles.price}>
        <Box className={styles.quantity}>
          <IconButton disabled={product.quantity === 1} aria-label="delete">
            <RemoveCircleIcon
              color={product.quantity === 1 ? "disabled" : "primary"}
            />
          </IconButton>
          <input
            disabled
            type="number"
            min="1"
            defaultValue={product.quantity}
            className={styles.input}
          />
          <IconButton aria-label="delete">
            <AddCircleIcon color="secondary" />
          </IconButton>
        </Box>
        <Typography>
          {(product.totalPrice.centAmount / 100).toFixed()} USD
        </Typography>
        <IconButton className={styles.deleteBtn} aria-label="delete">
          <DeleteForeverIcon color="info" />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default CartItem;
