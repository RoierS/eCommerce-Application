import { IUserFullDataResponse } from "@interfaces/user-response";
import ProfileEstimation from "@pages/profile/profile-estimation";
import { render, screen } from "@testing-library/react";
// screen

const user = {
  version: 1,
  email: "1@1.com",
  firstName: "Ellen",
  lastName: "J",
  dateOfBirth: new Date("1987-09-07"),
  addresses: [
    {
      id: "vr70NCq9",
      streetName: "Main",
      postalCode: "1111",
      city: "Vienna",
      country: "AT",
    },
    {
      id: "-wFr8t72",
      streetName: "Main",
      postalCode: "1111",
      city: "Vienna",
      country: "AT",
    },
  ],
  billingAddressIds: ["vr70NCq9"],
  shippingAddressIds: ["-wFr8t72"],
  defaultBillingAddressId: "-wFr8t72",
  defaultShippingAddressId: "",
} as IUserFullDataResponse;
const disabled = true;

test("user profile component rendering", () => {
  render(<ProfileEstimation userData={user} isDisabled={disabled} />);

  const formElement = screen.getByTestId("form");
  expect(formElement).toBeInTheDocument();

  const accordion = screen.getByTestId("accordion");
  const resetPasswordButton = screen.getByTestId("password");
  expect(accordion).toContainElement(resetPasswordButton);

  expect(formElement).toHaveFormValues({
    email: "1@1.com",
    firstName: "Ellen",
    lastName: "J",
  });

  const emailInput = screen.getByTestId("email");
  expect(emailInput).toBeDisabled();
});
