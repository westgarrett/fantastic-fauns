/** @jsx h */
import { h, createContext } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import Message  from "../types/types";

import SocketContext from "./SocketContext";

const SocketProvider = (props: any) => {
  const [value, setValue] = useState<any>({
    messages: [] as Message[],
    points: [],
    user: Math.random().toString(36).substring(2, 15), // user is basically the ID
    message: "",
    members: [],
  });
  
  const ws = new WebSocket(`ws://localhost:3000/ws/${value.user}`);
  useEffect(() => {
    ws.onopen = () => {
      console.log("New client connected to server");
      const data = {
        type: "join",
        user: Math.random().toString(36).substring(2, 15),
      }
      ws.send(JSON.stringify(data));
      

      // set variables
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      switch (data.type) {
        case "message":
          setValue({
            ...value,
            user: data.user,
            messages: [...value.messages, data.message],
          });
          break;

        case "members":
          setValue({
            ...value,
            members: data.members,
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
