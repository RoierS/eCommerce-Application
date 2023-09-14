import React, { useEffect, useState } from "react";

import AppHeader from "@components/header/header";

import { ICartResponse } from "@interfaces/get-cart";
import styles from "@pages/cart/cart.module.scss";
import getCart from "@services/get-cart";

import { Navigate } from "react-router-dom";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import Typography from "@mui/material/Typography";

const Cart = () => {
  // State to store the fetched cart data
  const [cartData, setCartData] = useState<ICartResponse | null>(null);

  // State to track when the data is currently being loaded
  const [isLoading, setLoading] = useState(true);

  // State to track when get error
  const [requestError, setError] = useState<boolean>(false);

  // Fetch cart data when the component mounts
  useEffect(() => {
    const requestData = async () => {
      try {
        const data: ICartResponse = await getCart();
        setCartData(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    requestData().then();
  }, []);

  return (
    <div>
      <AppHeader />
      {/* eslint-disable-next-line no-nested-ternary */}
      {isLoading ? (
        <Box className={styles.spinner}>
          <CircularProgress />
        </Box>
      ) : // eslint-disable-next-line no-nested-ternary
      requestError ? (
        <Navigate to="*" />
      ) : cartData ? (
        <div>
          <div className={styles.article}>
            <Typography variant="h6" fontWeight="bold">
              Shopping bag ({cartData.lineItems.length})
            </Typography>
            {cartData.lineItems.map((item) => (
              <Box className={styles.product}>
                <div>
                  <div className={styles.cart}>
                    {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                    <img
                      className={styles.image}
                      src={item.variant.images[0].url}
                      alt="product image"
                    />
                    <Typography
                      variant="h4"
                      gutterBottom
                      style={{ fontSize: "1.2rem", width: "250px" }}
                    >
                      {item.name["en-US"]}
                    </Typography>
                    <Typography variant="h4">
                      {item.price.discounted !== undefined &&
                      item.price.discounted.value.centAmount > 0 ? (
                        <div className={styles.price}>
                          <span
                            style={{ textDecoration: "line-through" }}
                            className={styles.noSale}
                          >
                            {(
                              parseFloat(String(item.price.value.centAmount)) /
                              100
                            ).toFixed(2)}{" "}
                            USD
                          </span>
                          <span
                            style={{ color: "red" }}
                            className={styles.sale}
                          >
                            {(
                              parseFloat(
                                String(item.price.discounted.value.centAmount)
                              ) / 100
                            ).toFixed(2)}{" "}
                            USD
                          </span>
                        </div>
                      ) : (
                        <div className={styles.noSale}>
                          {(
                            parseFloat(String(item.price.value.centAmount)) /
                            100
                          ).toFixed(2)}{" "}
                          USD
                        </div>
                      )}
                    </Typography>
                  </div>
                </div>
              </Box>
            ))}
          </div>
        </div>
      ) : (
        <div>No product data available</div>
      )}
    </div>
  );
};

export default Cart;
