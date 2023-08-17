import axios, { AxiosResponse } from "axios";

import { ITokenResponse } from "@interfaces/token-response";

const obtainAccessToken = async (email: string, password: string) => {
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

export default obtainAccessToken;
