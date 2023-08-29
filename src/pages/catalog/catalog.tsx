/* eslint-disable no-console */
import { useEffect, useState } from "react";

import CardComponent from "@components/card/card";
import AppHeader from "@components/header/header";
import { IProductData } from "@interfaces/product-data";
import getProducts from "@services/get-products";

import searchProducts from "@services/search-products";

import { Container, Box, TextField, Button } from "@mui/material";

import styles from "./catalog.module.scss";

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.results);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const searchHandler = async () => {
    if (searchQuery.trim() !== "") {
      try {
        const searchResults = await searchProducts(searchQuery);
        setProducts(searchResults);
      } catch (error) {
        console.error("Error searching products:", error);
      }
    } else {
      fetchProducts();
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <AppHeader />
      <Container>
        <Box className={styles.searchContainer}>
          <TextField
            label="Search products"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={searchHandler}>
            Search
          </Button>
        </Box>
        <Box className={styles.container}>
          {products
            // .filter((product: IProductData) =>
            //   product.masterData.current.name["en-US"]
            //     .toLowerCase()
            //     .includes(searchQuery.toLowerCase())
            // )
            .map((product: IProductData) => (
              <CardComponent key={product.id} product={product} />
            ))}
        </Box>
      </Container>
    </>
  );
};

export default Catalog;
