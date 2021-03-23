import io from "socket.io-client";
import { BaseUrl } from "../../serviceApi/baseUrl";

var socket = io.connect(BaseUrl, {
  transports: ["websocket"],
});

export const socketCleint = socket;
