/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
import { useEffect, useState } from "react";

import CardComponent from "@components/card/card";
import AppHeader from "@components/header/header";
import { IProductData } from "@interfaces/product-data";
import { IProductSearchResult } from "@interfaces/product-search-result";
import getProducts from "@services/get-products";

import searchProducts from "@services/search-products";

import SearchIcon from "@mui/icons-material/Search";
import {
  Container,
  Box,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";

import styles from "./catalog.module.scss";

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchError, setSearchError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // fetching product list
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await getProducts();
      setProducts(response.results);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setIsLoading(false);
    }
  };

  // handle the search and set the products
  const searchHandler = async () => {
    if (searchQuery.trim() !== "") {
      try {
        setIsLoading(true);
        const searchResults = await searchProducts(searchQuery);
        setProducts(searchResults);
        setSearchError(false);
        setIsLoading(false);
      } catch (error) {
        console.error("Error searching products:", error);
        setSearchError(true);
        setIsLoading(false);
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
            variant="outlined"
            size="small"
            fullWidth
            autoComplete="off"
            InputProps={{
              endAdornment: (
                <Button
                  className={styles.searchButton}
                  variant="contained"
                  color="primary"
                  onClick={searchHandler}
                  startIcon={<SearchIcon />}
                  disabled={isLoading}
                  size="small"
                >
                  Search
                </Button>
              ),
            }}
          />
        </Box>
        <Box className={styles.container}>
          {isLoading ? (
            <CircularProgress />
          ) : searchError ? (
            <p>Too short request</p>
          ) : !searchError && products.length === 0 ? (
            <p>No such product found. Try again</p>
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
