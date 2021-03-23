const { default: axios } = require("axios");
const { BaseUrl } = require("./baseUrl");

//gets nylas contacts
const get_contacts_url = `${BaseUrl}api/v1/nylas/getContacts`;
export const getNylasContacts = async (data, token) => {
  return await axios.post(get_contacts_url, data, {
    headers: {
      Authorization: `Bearer ${token.jwtToken}`,
    },
  });
};

//gets nylas events
const get_events_url = `${BaseUrl}api/v1/nylas/getEvents`;
export const getNylasEvents = async (data, token) => {
  return await axios.post(get_events_url, data, {
    headers: {
      Authorization: `Bearer ${token.jwtToken}`,
    },
  });
};

//add nylas event
const add_event_url = `${BaseUrl}api/v1/nylas/addEvent`;
export const addNylasEvent = async (data, token) => {
    return await axios.post(add_event_url, data, {
      headers: {
        Authorization: `Bearer ${token.jwtToken}`,
      },
    });
  };
