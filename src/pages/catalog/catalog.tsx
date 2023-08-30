/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
import { useEffect, useState } from "react";

import CardComponent from "@components/card/card";
import AppHeader from "@components/header/header";
import { IProductData } from "@interfaces/product-data";
import { IProductSearchResult } from "@interfaces/product-search-result";
import getProducts from "@services/get-products";
import getSortedProducts from "@services/get-sorted-products";

import searchProducts from "@services/search-products";

import SearchIcon from "@mui/icons-material/Search";
import {
  Container,
  Box,
  TextField,
  Button,
  CircularProgress,
  Select,
  MenuItem,
} from "@mui/material";

import styles from "./catalog.module.scss";

const Catalog = () => {
  const [products, setProducts] = useState<IProductData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchError, setSearchError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sortingOption, setSortingOption] = useState("");

  // fetching the list of products
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

  // handle search and update products based on search query
  const searchHandler = async () => {
    setSortingOption("");
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
      setProducts([]);
      setSearchError(false);
    }

    setSearchQuery("");
  };

  // handle sorting and update products based on sorting option
  const sortHandler = async () => {
    try {
      setIsLoading(true);
      const sortedResults = await getSortedProducts(sortingOption);
      setProducts(sortedResults);
      setIsLoading(false);
    } catch (error) {
      console.error("Error sorting products:", error);
      setIsLoading(false);
    }
  };

  // handle fetching, sorting, and searching based on dependencies
  useEffect(() => {
    if (!sortingOption && !searchQuery) {
      fetchProducts();
    }
    if (searchQuery.trim() !== "" && sortingOption) {
      setSortingOption("");
      searchHandler();
    }
    if (sortingOption) {
      sortHandler();
    }
  }, [sortingOption]);

  return (
    <>
      <AppHeader />
      <Container>
        <Box className={styles.searchContainer}>
          <TextField
            className={styles.searchField}
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
                  sx={{ minWidth: 100 }}
                >
                  Search
                </Button>
              ),
            }}
          />
        </Box>
        <Box className={styles.sortingContainer}>
          <Select
            value={sortingOption}
            onChange={(e) => setSortingOption(e.target.value)}
            displayEmpty
            className={styles.sortingSelect}
            variant="outlined"
            size="small"
          >
            <MenuItem value="" disabled>
              Sort by
            </MenuItem>
            <MenuItem value="name.en-Us asc">Name (A-Z)</MenuItem>
            <MenuItem value="name.en-Us desc">Name (Z-A)</MenuItem>
            <MenuItem value="price asc">Price (Low to High)</MenuItem>
            <MenuItem value="price desc">Price (High to Low)</MenuItem>
          </Select>
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
