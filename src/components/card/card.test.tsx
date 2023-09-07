import { IProductData, IProductSearchResult } from "@interfaces/product-data";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import CardComponent from "./card";

describe("CardComponent", () => {
  const productData: IProductData | IProductSearchResult = {
    id: "1",
    masterData: {
      current: {
        name: {
          "en-US": "Product Name",
        },
        description: {
          "en-US": "Product Description",
        },
        categories: [
          {
            typeId: "test",
            id: "test",
          },
        ],
        masterVariant: {
          id: 1,
          sku: "test",
          key: "test",
          images: [
            {
              url: "product-image.jpg",
              dimensions: {
                w: 100,
                h: 100,
              },
            },
          ],
          prices: [
            {
              id: "test",
              value: {
                type: "test",
                currencyCode: "test",
                centAmount: 3000,
                fractionDigits: 3000,
              },
              discounted: {
                value: {
                  type: "test",
                  currencyCode: "test",
                  centAmount: 3000,
                  fractionDigits: 3000,
                },
              },
            },
          ],
          attributes: [
            {
              name: "Star-Rating",
              value: 4,
            },
          ],
        },
      },
    },
  };

  it("renders product name", () => {
    render(
      <MemoryRouter>
        <CardComponent product={productData} />
      </MemoryRouter>
    );
    const nameElement = screen.getByText("Product Name");
    expect(nameElement).toBeInTheDocument();
  });

  it("renders product description", () => {
    render(
      <MemoryRouter>
        <CardComponent product={productData} />
      </MemoryRouter>
    );
    const descriptionElement = screen.getByText("Product Description");
    expect(descriptionElement).toBeInTheDocument();
  });

  it("renders the product image", () => {
    render(
      <MemoryRouter>
        <CardComponent product={productData} />
      </MemoryRouter>
    );
    const imageElement = screen.getByAltText("Product Name");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", "product-image.jpg");
  });
});
