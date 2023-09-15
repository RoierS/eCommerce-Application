import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

// import { Box, Typography } from "@mui/material";

import styles from "../../pages/cart/cart.module.scss";

const OrderSum = (props: { price: number }) => {
  const { price } = props;
  const theme = useTheme();
  const large = useMediaQuery(theme.breakpoints.up("lg"));
  const medium = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <Paper className={styles.totalContainer}>
      <Box className={styles.total}>
        <Typography variant={large || medium ? "h3" : "h4"} color="primary">
          Total:
        </Typography>
        <Typography variant={large || medium ? "h3" : "h4"} color="primary">
          {(price / 100).toFixed()} USD
        </Typography>
      </Box>
      <Box className={styles.promocode}>
        <TextField
          className={styles.promoText}
          variant="outlined"
          label="Promo Code"
        />
        <Button className={styles.promoBtn} variant="contained" color="info">
          Apply promo code
        </Button>
      </Box>
    </Paper>
  );
};

export default OrderSum;
