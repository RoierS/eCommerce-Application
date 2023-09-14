/* eslint-disable no-console */
import React, { useEffect, useState } from "react";

import calculateDiscount from "@helpers/claculate-discount";

import sliceText from "@helpers/slice-text";

import {
  IAttribute,
  IImage,
  ILocalizedText,
  IPrice,
  IProductData,
} from "@interfaces/product-data";
import { IProductSearchResult } from "@interfaces/product-search-result";
import { Link } from "react-router-dom";

import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  CardMedia,
  CardContent,
  Typography,
  Chip,
  CardActions,
  Button,
  Card,
  Rating,
  Box,
} from "@mui/material";

import styles from "./card.module.scss";

export interface ILineItem {
  addedAt: string;
  id: string;
  lastModifiedAt: string;
  lineItemMode: string;
  name: ILocalizedText;
  price: IPrice[];
  priceMode: string;
  productId: string;
  productKey: string;
  productSlug: ILocalizedText;
  quantity: number;
  totalPrice: {
    type: string;
    currencyCode: string;
    centAmount: number;
    fractionDigits: number;
  };
  variant: IVariant[];
}

interface IVariant {
  id: number;
  sku: string;
  key: string;
  prices: IPrice[];
  images: IImage[];
  attributes: IAttribute[];
  assets: IAttribute[];
}

const CardComponent: React.FC<{
  product: IProductData | IProductSearchResult;
  onAddToCart: (productId: string) => void;
}> = ({ product, onAddToCart }) => {
  const [isInCart, setIsInCart] = useState(false);

  // handling adding product to cart
  const handleAddToCart = () => {
    try {
      onAddToCart(product.id);
      const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
      cartItems.push({ productId: product.id });
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      setIsInCart(true);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  // check needed to use appropriate interface
  const isProductData = "masterData" in product;

  const originalPrice = isProductData
    ? product.masterData.current.masterVariant.prices[0].value.centAmount
    : product.masterVariant.prices[0].value.centAmount;
  const discountPrice = isProductData
    ? product.masterData.current.masterVariant.prices[0].discounted?.value
        .centAmount
    : product.masterVariant.prices[0].discounted?.value.centAmount;

  // calculate discount
  const discountPercentage = calculateDiscount(originalPrice, discountPrice);

  // trim the discription of product
  const briefDescription = isProductData
    ? sliceText(product.masterData.current.description["en-US"], 150)
    : sliceText(product.description["en-US"], 150);

  const imageUrl = isProductData
    ? product.masterData.current.masterVariant.images[0].url
    : product.masterVariant.images[0].url;

  const productName = isProductData
    ? product.masterData.current.name["en-US"]
    : product.name["en-US"];

  const starRating = isProductData
    ? product.masterData.current.masterVariant.attributes.find(
        (attribute) => attribute.name === "Star-Rating"
      )?.value
    : product.masterVariant.attributes.find(
        (attribute) => attribute.name === "Star-Rating"
      )?.value;

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const isItemInCart = cartItems.some(
      (item: ILineItem) => item.productId === product.id
    );
    setIsInCart(isItemInCart);
  }, [product.id]);

  return (
    <Card className={styles.card}>
      <div className={styles.discountBadge}>
        {discountPercentage > 0 && (
          <div className={styles.badgeIcon}>
            <LocalOfferIcon className={styles.iconBadge} />
            <span
              className={styles.discountPercent}
            >{`-${discountPercentage}%`}</span>
          </div>
        )}
      </div>
      <CardMedia
        height="250"
        component="img"
        className={styles.image}
        image={imageUrl}
        alt={productName}
      />
      <CardContent className={styles.content}>
        <Typography variant="h6" color="secondary">
          {productName}
        </Typography>
        <Box className={styles.rating}>
          <Box className={styles.ratingText}>Hotel class:</Box>
          <Rating name="star-rating" value={Number(starRating)} readOnly />
        </Box>
        <Typography variant="body2">{briefDescription}</Typography>
        {discountPrice ? (
          <>
            <Typography className={styles.originalPriceStriked}>
              Price: {(originalPrice / 100).toFixed()} USD
            </Typography>
            <Typography className={styles.discountedPrice}>
              Discounted Price: {(discountPrice / 100).toFixed()} USD
            </Typography>
            <Chip
              component="span"
              size="small"
              variant="outlined"
              color="success"
              label="Lowest price"
            />
          </>
        ) : (
          <Typography className={styles.originalPrice}>
            Price: {(originalPrice / 100).toFixed()} USD
          </Typography>
        )}
        <CardActions className={styles.cardAction}>
          <Link to={`/catalog/${product.id}`} className={styles.link}>
            <Button
              className={styles.button}
              variant="contained"
              size="small"
              color="primary"
            >
              More
            </Button>
          </Link>
          <Button
            className={styles.button}
            variant="contained"
            size="small"
            color={isInCart ? "secondary" : "success"}
            // onClick={() => handleAddToCart()}
            onClick={handleAddToCart}
            startIcon={<ShoppingCartIcon />}
            disabled={isInCart}
          >
            {isInCart ? "Added" : "Add to Cart"}
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default CardComponent;
