import React from "react";

import { IProductData } from "@interfaces/product-data";

import { Link } from "react-router-dom";

import {
  CardMedia,
  CardContent,
  Typography,
  Chip,
  CardActions,
  Button,
  Card,
} from "@mui/material";

import styles from "./card.module.scss";

interface ICardProps {
  product: IProductData;
}

const CardComponent: React.FC<ICardProps> = ({ product }) => {
  return (
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
              {product.masterData.current.masterVariant.prices[0].discounted
                .value.centAmount / 100}{" "}
              USD
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
            Original Price:{" "}
            {product.masterData.current.masterVariant.prices[0].value
              .centAmount / 100}{" "}
            USD
          </Typography>
        )}
        <CardActions>
          <Link to={`/product/${product.id}`} className={styles.link}>
            <Button variant="contained" size="small" color="primary">
              More
            </Button>
          </Link>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default CardComponent;
