import axios, { AxiosResponse } from "axios";

import { ICustomerLoginResponse } from "@interfaces/login-response";
import { ITokenResponse } from "@interfaces/token-response";

//  Obtain an access token from the CommerceTools
export const obtainAccessToken = async (email: string, password: string) => {
  const authHost = "https://auth.europe-west1.gcp.commercetools.com";
  const clientId = "wsbcBGYjiagoo5MZPbXjlNCR";
  const clientSecret = "ua-_OJmI0bCJmCYRmuR_L5torJqfmZ8S";

  const basicAuth = btoa(`${clientId}:${clientSecret}`);
  const headers = {
    Authorization: `Basic ${basicAuth}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const data = new URLSearchParams();
  data.append("grant_type", "password");
  data.append("username", email);
  data.append("password", password);

  const response: AxiosResponse<ITokenResponse> = await axios.post(
    `${authHost}/oauth/ecommerce-app-final-task/customers/token`,
    data.toString(),
    { headers }
  );

  return response.data;
};

// Login customer using access token
export const loginCustomer = async (
  accessToken: string,
  email: string,
  password: string
): Promise<ICustomerLoginResponse> => {
  const apiHost = "https://api.europe-west1.gcp.commercetools.com";
  const projectKey = "ecommerce-app-final-task";

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  const data = {
    email,
    password,
  };

  try {
    const response = await axios.post<ICustomerLoginResponse>(
      `${apiHost}/${projectKey}/me/login`,
      data,
      { headers }
    );

    return response.data;
  } catch (error) {
    // TODO: Error handling
    // eslint-disable-next-line no-console
    console.error("Error while logging in:", error);
    throw error;
  }
};
