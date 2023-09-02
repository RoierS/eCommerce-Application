// import axios from "axios";

import { IUserPersonalDataResponse } from "@interfaces/user-response";

const updatePersonalData = async (
  data: IUserPersonalDataResponse,
  version: number
) => {
  console.log(data, version);

  // const { email, firstName, lastName, dateOfBirth } = data;

  // const user: IUserPersonalDataUpdate = {
  //   email: data.email,
  //   firstName: data.firstName,
  //   lastName: data.lastName,
  //   dateOfBirth: dayjs(data.birthday).format("YYYY-MM-DD"),}
};

export default updatePersonalData;
