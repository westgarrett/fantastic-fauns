/** @jsx h */
import { h } from "preact";
import { useEffect, useRef, useState, useContext  } from "preact/hooks";
import Message from '../types/types';
import SocketContext from "./SocketContext";

const Chat = () => {
  const ws = useContext(SocketContext);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(ws.user);
  const input = useRef(null);

  useEffect(() => {
    input.current.focus();
  }
  , []);
  const sendMessage = () => {
    ws.messages = [...ws.messages, {
      type: "message",
      user,
      message,
    }];
    setMessage("");
  };

  return (
    <div class='flex flex-col justify-between bg-white h-auto rounded-lg mt-10 px-5 py-2'>
      <div class='flex flex-col w-full'>
        {ws.messages.map((message) => (
          <p>{message.user}: {message.message}</p>
        ))}
      </div>

      <div class='flex flex-row w-full'>
          <input
            ref={input}
            value={message}
            onKeyDown={(e) => e.key === "Enter"  && sendMessage()}
            onChange={(event) => setMessage(event.target.value)}
            type="text"
            class='w-full shadow-lg py-5 rounded-lg mx-2 px-2'
            placeholder="Say something"
          />
          <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
