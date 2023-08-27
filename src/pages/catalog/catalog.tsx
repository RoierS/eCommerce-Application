/* eslint-disable no-console */
import { useEffect, useState } from "react";

import AppHeader from "@components/header/header";
import { IProductData } from "@interfaces/product-data";
import getProducts from "@services/get-products";

import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  Box,
  CardActions,
} from "@mui/material";

import styles from "./catalog.module.scss";

const Catalog = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.results);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <AppHeader />
      <Container>
        <Box className={styles.container}>
          {products.map((product: IProductData) => (
            <Card key={product.id} className={styles.card}>
              <CardMedia
                height="250"
                component="img"
                className={styles.image}
                image={product.masterData.current.masterVariant.images[0].url}
                alt={product.masterData.current.name["en-US"]}
              />
              <CardContent className={styles.content}>
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
                <CardActions>
                  <Button variant="contained" size="small" color="primary">
                    More
                  </Button>
                </CardActions>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </>
  );
};

export default Catalog;
