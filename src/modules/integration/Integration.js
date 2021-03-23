import axios from "axios";
import React, { useState, useEffect } from "react";
import { MdEventBusy } from "react-icons/md";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { BaseUrl } from "../../serviceApi/baseUrl";
import { getNylasContacts, addNylasEvent } from "../../serviceApi/nylasService";

export default function Integration(props) {
  const [messages, setMessages] = useState([]);
  const [nylasContacts, setNylasContacts] = useState(["demmy@gmail.com"]);
  const token = useSelector((state) => state.userReducer.user.idToken.jwtToken);
  const initial_state = {
    title: '',
    description: '',
    date: ''
  }
  const [eventValues, setEventValues] = useState(initial_state)

  const { "custom:accessToken": accessToken } = useSelector(
    (state) => state.userReducer.user
  );
  let { user: auth } = useSelector((state) => state.userReducer);

  console.log(props.location, "location");
  const history = useHistory();
  const google_oauth_url = `${BaseUrl}api/v1/integration/google/oauth2callback`;
  useEffect(() => {
    const fetchUserMessages = async () => {
      const url = `${BaseUrl}api/v1/nylas/getEmailWithOffSetAndLimit`;
      const response = await axios.post(url, {
        offset: 0,
        limit: 5,
        accessToken,
      });

      setMessages(response.data.data);
      console.log("fetch user message", response);
    };
    if (accessToken) {
      fetchUserMessages();
    }
  }, [accessToken]);
  useEffect(() => {
    const fetchNylasContacts = async () => {
      try {
        if (accessToken) {
          const response = await getNylasContacts({ accessToken: accessToken });

          const array = response.data.data;
          setNylasContacts(array);
        }
      } catch (error) {
        console.log("Error fetching nylas contacts");
      }
    };

    if (accessToken) {
      fetchNylasContacts();
    }
  }, []);
  const getMessagesView = () => {
    console.log("Messages", messages);
    return messages.map((message) => {
      return (
        <div>
          <span
            style={{
              clear: "both",
              display: "inline-block",
              overflow: "hidden",
              whiteSpace: "nowrap",
              width: "400px",
            }}
          >
            Subject: {message.subject}
          </span>
        </div>
      );
    });
  };

  const onValueChange = (e) => {
    setEventValues({...eventValues, [e.target.name]: e.target.value})
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    const data = {
      title: eventValues.title,
      description: eventValues.description,
      start: eventValues.date,
      end: eventValues.date,
      accessToken
    }
    console.log(data)
    try {
      if (accessToken) {
        const response = await addNylasEvent(data, auth.idToken);
        setEventValues(initial_state)
        alert('Event Added')
        console.log(response.data)
      }
    } catch (error) {
      console.log("Error adding nylas event");
    }
  }

  const getEventForm = () => {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input type="text" name="title" value={eventValues.title} onChange={onValueChange} />
          </label>
          <label>
            Description:
            <input type="text" name="description" value={eventValues.description} onChange={onValueChange} />
          </label>
          <label>
            Date:
            <input type="date" name="date" value={eventValues.date} onChange={onValueChange} />
          </label>
          <input type="submit" value="Add Event" />
        </form>
      </div>
    );
  };

  const changeRoutes = () => {
    window.location.href = google_oauth_url + "?token=" + token;
  };
  return (
    <div
      style={{
        width: "200px",
      }}
    >
      {/* <span></span> */}
      {!accessToken && (
        <button
          style={{ width: "200px", height: "100px" }}
          onClick={() => changeRoutes("")}
        >
          Google Login
        </button>
      )}
      <h2>Inbox</h2>
      {getMessagesView()}
      <h2>Add Event</h2>
      {getEventForm()}
      <h2>email </h2>
      {nylasContacts.map((item) => {
        return (
          <div>
            <span
              style={{
                clear: "both",
                display: "inline-block",
                overflow: "hidden",
                whiteSpace: "nowrap",
                width: "400px",
              }}
            >
              {item}
            </span>
          </div>
        );
      })}
    </div>
  );
}
