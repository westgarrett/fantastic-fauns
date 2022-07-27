/** @jsx h */
import { h, createContext } from "preact";
import { tw } from "twind";
import { useEffect, useRef, useState } from "preact/hooks";

const SocketContext = createContext({
  sendData: () => { },
  setMessages: () => { },
  setPoints: () => { },
  setUser: () => { },
  setMessage: () => { },
});

const SocketProvider = (props) => {
  console.log(props);
  const [messages, setMessages] = useState<Message[]>([]);
  const [points, setPoints] = useState<number>(0);
  const [user, setUser] = useState<string>("Anonymous");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000/ws");
    ws.onopen = () => {
      console.log("New client connected to server");

      const data = {
        type: "join",
        user: user,
      }
      ws.send(JSON.stringify(data));
    };
  }, []);

  const sendData = (data) => {
    ws.send(JSON.stringify(data));
  }

  return (
    <SocketContext.Provider>
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
