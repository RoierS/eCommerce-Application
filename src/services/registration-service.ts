import {
  IRegistrateData,
  ICustomerRegistrationResponse,
} from "@interfaces/registration-form-data";
import { ITokenResponse } from "@interfaces/token-response";
import axios, { AxiosResponse } from "axios";

//  get an access token from the CommerceTools
export const getAccessToken = async () => {
  // Note: clientId, clientSecret taken from "API The Reactonauts" not from "E-commerce App API"
  const authHost = process.env.REACT_APP_AUTH_HOST;
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_CLIENT_SECRET;

  const basicAuth = btoa(`${clientId}:${clientSecret}`);
  const headers = {
    Authorization: `Basic ${basicAuth}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  try {
    const response: AxiosResponse<ITokenResponse> = await axios.post(
      `${authHost}/oauth/token?grant_type=client_credentials`,
      null,
      { headers }
    );

    localStorage.setItem("tokenObject", JSON.stringify(response.data));

    console.log(JSON.stringify(response.data));

    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    throw error;
  }
};

// Registrate customer using access token
export const registrateCustomer = async (
  accessToken: string,
  data: IRegistrateData
): Promise<ICustomerRegistrationResponse> => {
  const apiHost = process.env.REACT_APP_API_HOST;
  const projectKey = process.env.REACT_APP_PROJECT_KEY;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const response = await axios.post<ICustomerRegistrationResponse>(
      `${apiHost}/${projectKey}/me/signup`,
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
