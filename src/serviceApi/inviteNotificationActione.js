const { default: axios } = require("axios");
const { BaseUrl } = require("./baseUrl");

const url = `${BaseUrl}api/v1/notification/inviteNotificationAction`;
export const ReponseOnInviteNotication = async (payload, token) => {
  return await axios.post(url, payload, {
    headers: {
      Authorization: `Bearer ${token.jwtToken}`,
    },
  });
};
