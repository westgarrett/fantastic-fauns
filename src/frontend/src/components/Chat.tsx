/** @jsx h */
import { h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import Message from '../types/types';

const Chat = (props) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState("Anonymous");
  const input = useRef(null);

  useEffect(() => {
    setMessages(props.messages);
    input.current.addEventListener("keydown", (e) => {
        
        if (e.key === "Enter") {
            sendMessage();
        }
    });
}, []);

  // test messages
  const testMessages = () => {
    setMessages([
      { message: "Hello", user: "John" },
      { message: "Hi", user: "Jane" },
      { message: "How are you?", user: "John" },
      { message: "I'm fine", user: "Jane" },
    ]);
  };
  const sendMessage = () => {
    setMessages([...messages, { message, user }]);
    setMessage("");
  };

  return (
    <div
      class='flex flex-col justify-between bg-white h-auto rounded-lg mt-10 px-5 py-2'
    >
      <div class='flex flex-col w-full'>
        {messages.map((message, index) => (
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
