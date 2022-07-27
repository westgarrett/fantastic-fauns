/** @jsx h */
import { h, createContext } from "preact";
import { tw } from "@twind";
import { useEffect, useRef, useState } from "preact/hooks";
import Message from '../types/types.ts';

export default function App() {
  const canvas = useRef(null);

  return (
    <SocketProvider>
    <div class={tw`flex justify-center h-screen flex-row bg-gray-800`}>
      <div class={tw`flex mt-12 mb-16`}>
        <Canvas />
        <Chat />
      </div>
    </div>
    </SocketProvider>
  );
}

//////////////////////////////////////////////////////////////////////////////////////////////
// SEPARATE THIS FROM THE REST OF THE CODE INCASE IT DOESN'T WORK
//////////////////////////////////////////////////////////////////////////////////////////////

const Canvas = () => {
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
  
    useEffect(() => {
      let painting = false;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.lineWidth = 10;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.fillStyle = "black";
      ctxRef.current = ctx;
  
      // create full logic for drawing
      const draw = (e) => {
        if (!painting) return;
        console.log(e);
        ctx.current.lineTo(
          e.nativeEvent.offsetX,
          e.nativeEvent.offsetY,
        );
  
        ctx.current.stroke();
      };
      const start = (e: any) => {
        ctx.beginPath();
        ctx.current.moveTo(
          e.nativeEvent.offsetX,
          e.nativeEvent.offsetY,
        );
        painting = true;
      };
      const stop = (e: any) => {
        ctx.current.closePath();
        painting = false;
      };
  
      // event listeners
      canvas.current.addEventListener("mousedown", start);
      canvas.current.addEventListener("mouseup", stop);
      canvas.current.addEventListener("mousemove", draw);
    });
  
    return (
      <div
        class={tw
          `flex mt-6 flex-row shadow-2xl justify-center mt-10 bg-white mx-5 rounded-lg`}
      >
        <canvas ref={canvasRef} class={tw`w-[700px] h-[700px]`}>
          Your browser does not support the HTML5 canvas tag.
        </canvas>
      </div>
    );
  };
  
  const Chat = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [message, setMessage] = useState("");
    const [user, setUser] = useState("Anonymous");
    const input = useRef(null);
  
    useEffect(() => {
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
        class={tw
          `flex flex-col justify-between bg-white h-auto rounded-lg mt-10 px-5 py-2`}
      >
        <div class={tw`flex flex-col w-full`}>
          {messages.map((message, index) => (
            <p>{message.user}: {message.message}</p>
          ))}
        </div>
  
        <div class={tw`flex flex-row w-full`}>
            <input
              ref={input}
              value={message}
              onKeyDown={(e) => e.key === "Enter"  && sendMessage()}
              onChange={(event) => setMessage(event.target.value)}
              type="text"
              class={tw`w-full shadow-lg py-5 rounded-lg mx-2 px-2`}
              placeholder="Say something"
            />
            <button onClick={sendMessage}>Send</button>
        </div>
        
      </div>
    );
  };

  const SocketContext = createContext({
    sendData: () => {},
    setMessages: () => {},
    setPoints: () => {},
    setUser: () => {},
    setMessage: () => {},
  });
  
  const SocketProvider = (props) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [points, setPoints] = useState<number>(0);
    const [user, setUser] = useState<string>("Anonymous");
    const [message, setMessage] = useState<string>("");
  
    useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000/ws");
    ws.onopen = () => {
      console.log("New client connected to server");
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
  