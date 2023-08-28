import { useEffect, useState } from "react";

import AppHeader from "@components/header/header";
import { IProductResponse } from "@interfaces/product-response";

import getProductById from "@services/get-product-by-id";
import { useParams } from "react-router-dom";

import { ImageList, ImageListItem } from "@mui/material";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

import styles from "./products.module.scss";

const ProductInformation = () => {
  const { id } = useParams();

  const [product, setProduct] = useState<IProductResponse | null>(null);
  const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [requestError, setError] = useState<boolean>(false);
  useEffect(() => {
    const requestData = async () => {
      try {
        const productData = await getProductById(id);
        setProduct(productData);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    requestData().then();
  }, [id]);
  const handleToggleDescription = () => {
    setDescriptionExpanded(!isDescriptionExpanded);
  };
  return (
    <div>
      <AppHeader />
      {/* eslint-disable-next-line no-nested-ternary */}
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : // eslint-disable-next-line no-nested-ternary
      requestError ? (
        <div>Error fetching product data</div>
      ) : product ? (
        <div className={styles.article}>
          <Box className={styles.product}>
            <ImageList
              sx={{
                width: 700,
                height: 550,
                transform: "translateZ(0)",
              }}
              rowHeight={200}
              gap={1}
            >
              {product.masterData.current.masterVariant.images.map(
                (image, index) => {
                  const rowHeight = index === 0 ? 400 : 200;
                  const cols = index === 0 ? 2 : 1;
                  const rows = index === 0 ? 2 : 1;
                  return (
                    <ImageListItem key={image.url} cols={cols} rows={rows}>
                      {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                      <img
                        src={image.url}
                        alt="Product Image"
                        loading="lazy"
                        style={{ height: rowHeight }}
                      />
                    </ImageListItem>
                  );
                }
              )}
            </ImageList>
            <div>
              <div>
                <Typography variant="h4" gutterBottom>
                  {product.masterData.current.name["en-US"]}
                </Typography>
              </div>
              <div
                style={{
                  marginTop: "26px",
                  maxWidth: "600px",
                  overflow: "hidden",
                }}
              >
                <Typography variant="body1">
                  {isDescriptionExpanded
                    ? product.masterData.current.description["en-US"]
                    : `${product.masterData.current.description["en-US"].slice(
                        0,
                        600
                      )}...`}
                </Typography>
                <Button onClick={handleToggleDescription}>
                  {isDescriptionExpanded ? "Read Less" : "Show More"}
                </Button>
              </div>
              <div className={styles.price}>
                <Typography variant="h4">
                  $
                  {(
                    parseFloat(
                      String(
                        product.masterData.current.masterVariant.prices[0].value
                          .centAmount
                      )
                    ) / 100
                  ).toFixed(2)}
                </Typography>
              </div>
            </div>
          </Box>
        </div>
      ) : (
        <div>No product data available</div>
      )}
    </div>
  );
};

export default ProductInformation;
