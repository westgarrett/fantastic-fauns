import { createContext } from "preact";
import Message from "../../types/types";

const SocketContext = createContext({
    messages: [] as Message[],
    points: [],
    user: "",
    message: "",
    
});

export default SocketContext;