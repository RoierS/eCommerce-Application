import React, { useEffect, useState } from "react";

import { IHeaderRoute } from "@components/header/header-route";
import EventSystem from "@helpers/event-system";
import { ILineItem } from "@interfaces/cart";
import { Link } from "react-router-dom";

import { Box, Icon, IconButton, Typography } from "@mui/material";

import Badge from "@mui/material/Badge";

import styles from "./header.module.scss";

const CartRoute: React.FC<IHeaderRoute> = ({ to, icon, label }) => {
  const [cartItemsCount, setCartItemsCount] = useState(
    JSON.parse(localStorage.getItem("cartItems") || "[]").length
  );

  // Загрузка количества товаров в корзине из localStorage
  useEffect(() => {
    EventSystem.onCartUpdate = () => {
      const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
      const totalQuantity = cartItems.reduce(
        (total: number, item: ILineItem) => total + item.quantity,
        0
      );
      setCartItemsCount(totalQuantity);
    };

    EventSystem.onCartUpdate();
  }, []);

  return (
    <Link to={to} className={styles.link}>
      <Box display="flex" alignItems="center">
        <Icon
          aria-label={label}
          sx={{ marginRight: 1 }}
          style={{ overflow: "visible" }}
        >
          <IconButton aria-label="cart" style={{ padding: "0" }}>
            <Badge color="secondary" badgeContent={cartItemsCount}>
              <span>{icon}</span>
            </Badge>
          </IconButton>
        </Icon>
        <Typography variant="body1">{label}</Typography>
      </Box>
    </Link>
  );
};

export default CartRoute;
