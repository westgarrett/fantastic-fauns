/** @jsx h */
import { h, createContext } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import Message  from "../types/types";

import SocketContext from "./SocketContext";

const SocketProvider = (props) => {
  const [value, setValue] = useState<any>({
    messages: [] as Message[],
    points: [],
    user: "Anonymous",
    message: "",
  });
  const ws = new WebSocket("ws://localhost:3000/ws");

  useEffect(() => {
    ws.onopen = () => {
      console.log("New client connected to server");
      const data = {
        type: "join",
        user: value.user,
      }
      ws.send(JSON.stringify(data));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      switch (data.type) {
        case "message":
          setValue({
            ...value,
            user: data.user,
            messages: [...value.messages, data],
          });
          break;
      }
    }

    ws.onclose = () => {
      ws.send(JSON.stringify({
        type: "leave",
        user: value.user,
        }));
    }
  }, []);

  const sendData = (data) => {
    ws.send(JSON.stringify(data));
  }


  return (
    <SocketContext.Provider value={value}>
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
