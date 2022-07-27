/** @jsx h */
import { h, createContext } from "preact";
import { tw } from "twind";
import { useEffect, useRef, useState } from "preact/hooks";

const SocketContext = createContext({
  messages: [],
  points: [],
  user: "",
  message: "",

});

const SocketProvider = (props) => {
  console.log(props);
  const [messages, setMessages] = useState<Message[]>([]);
  const [points, setPoints] = useState<number>(0);
  const [user, setUser] = useState<string>("Anonymous");
  const [message, setMessage] = useState<string>("");
  const ws = new WebSocket("ws://localhost:3000/ws");

  useEffect(() => {

    ws.onopen = () => {
      console.log("New client connected to server");
      const data = {
        type: "join",
        user,
      };
      ws.send(JSON.stringify(data));
    };
  }, []);

  const sendData = (data) => {
    ws.send(JSON.stringify(data));
  }

  return (
    <SocketContext.Provider value={{ messages, points, user, message, sendData }}>
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
