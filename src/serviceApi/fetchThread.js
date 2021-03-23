const { default: axios } = require("axios");
const { BaseUrl } = require("./baseUrl");

const url = `${BaseUrl}api/v1/threads`;
export const fetchThreads = async (token) => {
  return await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token.jwtToken}`,
    },
  });
};
