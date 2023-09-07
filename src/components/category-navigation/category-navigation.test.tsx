import { Category } from "@interfaces/category";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import CategoryNavigation from "./category-navigation";

describe("CategoryNavigation", () => {
  const categories: Category[] = [
    {
      id: "1",
      name: { "en-US": "Spain" },
      key: "Spain",
      slug: { "en-US": "Spain" },
      description: { "en-US": "Spain" },
      ancestors: [
        {
          typeId: "test",
          id: "test",
        },
      ],
      parent: {
        typeId: "test",
        id: "test",
      },
      orderHint: "test",
    },
  ];

  it("renders category chips", () => {
    render(
      <MemoryRouter>
        <CategoryNavigation
          categories={categories}
          selectedCategory={null}
          onClick={() => {}}
        />
      </MemoryRouter>
    );

    categories.forEach((category) => {
      const chipElement = screen.getByText(category.name["en-US"]);
      expect(chipElement).toBeInTheDocument();
    });
  });

  it("calls onClick when a category chip is clicked", () => {
    const onClickMock = jest.fn();

    render(
      <MemoryRouter>
        <CategoryNavigation
          categories={categories}
          selectedCategory={null}
          onClick={onClickMock}
        />
      </MemoryRouter>
    );

    const categoryToClick = categories[0];
    const chipElement = screen.getByText(categoryToClick.name["en-US"]);

    fireEvent.click(chipElement);

    expect(onClickMock).toHaveBeenCalledWith(
      expect.anything(),
      categoryToClick.id
    );
  });
});
