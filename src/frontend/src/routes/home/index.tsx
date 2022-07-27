import { h } from 'preact';
import style from './style.css';
import Canvas from "../../components/Canvas";
import Chat from "../../components/Chat";
import SocketProvider from "../../components/SocketProvider";

const Home = () => (
	<SocketProvider>
    <div class='flex justify-center h-screen flex-row bg-gray-800'>
      <div class='flex mt-12 mb-16'>
        <Canvas />
        <Chat />
      </div>
    </div>
    </SocketProvider>
);

export default Home;
