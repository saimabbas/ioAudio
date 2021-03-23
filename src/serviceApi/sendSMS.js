const { default: axios } = require("axios");
const { BaseUrl } = require("./baseUrl");

const url = `${BaseUrl}api/v1/sms/sendSms`;

export const sendSmsForVoice = async (data, token) => {
  return await axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${token.jwtToken}`,
    },
  });
};
