import axios from "axios";

import getValidAccessToken from "@helpers/check-token";
import { ITokenResponse } from "@interfaces/token-response";
import { IPasswordUpdate } from "@interfaces/user-update";

const changePasswordRequest = async (data: IPasswordUpdate) => {
  const tokenObject: ITokenResponse = await getValidAccessToken();
  const accessToken = tokenObject.access_token;
  const apiHost = process.env.REACT_APP_API_HOST;
  const projectKey = process.env.REACT_APP_PROJECT_KEY;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const response = await axios.post(
      `${apiHost}/${projectKey}/me/password`,
      data,
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error fetching user data (in get user service):", error);
    throw error;
  }
};

export default changePasswordRequest;
