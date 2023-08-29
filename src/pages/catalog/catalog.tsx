/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
import { useEffect, useState } from "react";

import CardComponent from "@components/card/card";
import AppHeader from "@components/header/header";
import { IProductData } from "@interfaces/product-data";
import { IProductSearchResult } from "@interfaces/product-search-result";
import getProducts from "@services/get-products";

import searchProducts from "@services/search-products";

import { Container, Box, TextField, Button } from "@mui/material";

import styles from "./catalog.module.scss";

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchError, setSearchError] = useState(false);

  // fetching product list
  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.results);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // handle the search and set the products
  const searchHandler = async () => {
    if (searchQuery.trim() !== "") {
      try {
        const searchResults = await searchProducts(searchQuery);
        setProducts(searchResults);
        setSearchError(false);
      } catch (error) {
        console.error("Error searching products:", error);
        setSearchError(true);
      }
    } else {
      fetchProducts();
    }

    setSearchQuery("");
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
          {searchError ? (
            <p>Too short request</p>
          ) : !searchError && products.length === 0 ? (
            <p>No product found</p>
          ) : (
            products.map((product: IProductData | IProductSearchResult) => (
              <CardComponent key={product.id} product={product} />
            ))
          )}
        </Box>
      </Container>
    </>
  );
};

export default Catalog;
