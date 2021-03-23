const { default: axios } = require("axios");
const { BaseUrl } = require("./baseUrl");

const url = `${BaseUrl}api/v1/notification`;
export const getNotification = async (token) => {
  return await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token.jwtToken}`,
    },
  });
};
