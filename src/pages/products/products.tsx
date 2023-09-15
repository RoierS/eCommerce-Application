/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import CartButton from "@components/cart/cart-button";
import AppHeader from "@components/header/header";
import { ICartResponse } from "@interfaces/get-cart";
import { IProductResponse } from "@interfaces/product-response";

import ProductEstimation from "@pages/products/product-estimation";

import addProductToCart from "@services/add-product-to-cart";
import getCart from "@services/get-cart";
import getProductById from "@services/get-product-by-id";
import { Navigate, useParams } from "react-router-dom";

import ArrowBackIosNewTwoToneIcon from "@mui/icons-material/ArrowBackIosNewTwoTone";
import ArrowForwardIosTwoToneIcon from "@mui/icons-material/ArrowForwardIosTwoTone";

import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Modal } from "@mui/material";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import useMediaQuery from "@mui/material/useMediaQuery";

import styles from "./modal.module.scss";

const ProductInformation = () => {
  const { id } = useParams();

  // State to store the fetched product data
  const [product, setProduct] = useState<IProductResponse | null>(null);

  // State to toggle description visibility
  const [isDescription, setDescription] = useState(false);

  // State to track when the data is currently being loaded
  const [isLoading, setLoading] = useState(true);

  // State to track when get error
  const [requestError, setError] = useState<boolean>(false);

  // State to track when the modal is open
  const [isModalOpen, setModalOpen] = useState(false);

  // State to track current slide IN MODAL index
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);

  // State to track current slide index
  const [currentSlideBasicIndex, setCurrentSlideBasicIndex] = React.useState(0);

  // Function to open the modal and set the current slide index
  const openModal = (index: number) => {
    setCurrentSlideIndex(index);
    setModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalOpen(false);
  };

  // State to toggle button activity
  const [active, setActive] = useState(true);

  // Fetch product data when the component mounts
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

    const cartResponse = async () => {
      try {
        const data: ICartResponse = await getCart();
        if (data.lineItems.filter((item) => item.productId === id).length > 0) {
          setActive(false);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    };

    cartResponse().then();
  }, [id]);

  // Toggle the description when the button is clicked
  const toggleDescription = () => {
    setDescription(!isDescription);
  };

  // Function to switch to the next slide IN MODAL
  const nextSlide = () => {
    if (product) {
      setCurrentSlideIndex(
        (prevIndex) =>
          (prevIndex + 1) %
          product.masterData.current.masterVariant.images.length
      );
    }
  };

  // Function to switch to the previous slide IN MODAL
  const prevSlide = () => {
    setCurrentSlideIndex((index) => {
      if (product) {
        return index === 0
          ? product.masterData.current.masterVariant.images.length - 1
          : index - 1;
      }
      return index;
    });
  };

  // Function to switch to the next slide
  const nextBasicSlide = () => {
    if (product) {
      setCurrentSlideBasicIndex(
        (prevIndex) =>
          (prevIndex + 1) %
          product.masterData.current.masterVariant.images.length
      );
    }
  };

  // Function to switch to the previous slide
  const prevBasicSlide = () => {
    setCurrentSlideBasicIndex((index) => {
      if (product) {
        return index === 0
          ? product.masterData.current.masterVariant.images.length - 1
          : index - 1;
      }
      return index;
    });
  };

  // Add keyboard navigation within the modal
  useEffect(() => {
    const handleKeyDown = (event: { key: string }) => {
      if (isModalOpen) {
        if (event.key === "ArrowLeft") {
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          prevSlide();
        } else if (event.key === "ArrowRight") {
          nextSlide();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
      ) : product ? (
        <div className={styles.article}>
          <Box
            className={styles.product}
            style={isMobile ? { flexDirection: "column" } : {}}
          >
            <div>
              <div>
                <Typography variant="h4" gutterBottom>
                  {product.masterData.current.name["en-US"]}
                </Typography>
              </div>
              <div className={styles.title}>
                <Typography variant="body1">
                  {isDescription
                    ? product.masterData.current.description["en-US"]
                    : `${product.masterData.current.description["en-US"].slice(
                        0,
                        600
                      )}...`}
                </Typography>
                <Button onClick={toggleDescription}>
                  {isDescription ? "Read Less" : "Show More"}
                </Button>
              </div>
              <ProductEstimation product={product} />
            </div>
            <div style={{ maxWidth: 400 }}>
              <div className={styles.arrows}>
                <ArrowBackIosNewTwoToneIcon
                  className={styles.arrowLeft}
                  onClick={prevBasicSlide}
                />
                {/* eslint-disable-next-line jsx-a11y/img-redundant-alt, jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
                <img
                  className={styles.image}
                  // style={{ maxWidth: "300px" }}
                  onClick={() => openModal(currentSlideBasicIndex)}
                  src={
                    product.masterData.current.masterVariant.images[
                      currentSlideBasicIndex
                    ].url
                  }
                  alt="product image"
                />
                <ArrowForwardIosTwoToneIcon
                  className={styles.arrowRight}
                  onClick={nextBasicSlide}
                />
              </div>
            </div>
          </Box>
          <CartButton
            active={active}
            clickCallback={() => {
              (async () => {
                const cart: ICartResponse = await getCart();
                await addProductToCart(product, cart);
                setActive(false);
              })().then();
            }}
          />
          <Modal
            open={isModalOpen}
            onClose={closeModal}
            className={styles.modal}
          >
            <div className={styles.moooo}>
              <div className={styles.cross}>
                <CancelOutlinedIcon
                  fontSize="large"
                  className={styles.close}
                  onClick={closeModal}
                />
              </div>

              <div className={styles.arrows}>
                <ArrowBackIosNewTwoToneIcon
                  className={styles.arrowLeft}
                  onClick={prevSlide}
                />
                {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                <img
                  className={styles.image}
                  src={
                    product.masterData.current.masterVariant.images[
                      currentSlideIndex
                    ].url
                  }
                  alt="product image"
                />
                <ArrowForwardIosTwoToneIcon
                  className={styles.arrowRight}
                  onClick={nextSlide}
                />
              </div>
            </div>
          </Modal>
        </div>
      ) : (
        <div>No product data available</div>
      )}
    </div>
  );
};

export default ProductInformation;
