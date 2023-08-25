/* eslint-disable no-console */
import { useEffect, useState } from "react";

import AppHeader from "@components/header/header";
import { IProductData } from "@interfaces/product-data";
import getProducts from "@services/get-products";

import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

import styles from "./catalog.module.scss";

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const tokenObject = JSON.parse(localStorage.getItem("tokenObject") || "null");
  const accessToken = tokenObject?.access_token || "";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts(accessToken);
        setProducts(response.results);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [accessToken]);

  return (
    <>
      <AppHeader />
      <Box className={styles.container}>
        {products.map((product: IProductData) => (
          <Card key={product.id} className={styles.card}>
            <CardMedia
              component="img"
              className={styles.image}
              image={product.masterData.current.masterVariant.images[0].url}
              alt={product.masterData.current.name["en-US"]}
            />
            <CardContent>
              <Typography variant="h6">
                {product.masterData.current.name["en-US"]}
              </Typography>
              <Typography variant="body2">
                {product.masterData.current.description["en-US"]}
              </Typography>
              {product.masterData.current.masterVariant.prices[0].discounted
                ?.value ? (
                <>
                  <Typography className={styles.originalPriceStriked}>
                    Original Price:{" "}
                    {product.masterData.current.masterVariant.prices[0].value
                      .centAmount / 100}{" "}
                    USD
                  </Typography>
                  <Typography className={styles.discountedPrice}>
                    Discounted Price:{" "}
                    {product.masterData.current.masterVariant.prices[0]
                      .discounted.value.centAmount / 100}{" "}
                    USD
                  </Typography>
                </>
              ) : (
                <Typography className={styles.originalPrice}>
                  Original Price:{" "}
                  {product.masterData.current.masterVariant.prices[0].value
                    .centAmount / 100}{" "}
                  USD
                </Typography>
              )}
            </CardContent>
          </Card>
        ))}
      </Box>
    </>
  );
};

export default Catalog;
