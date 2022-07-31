/** @jsx h */
import { h, createContext } from "preact";
import { useEffect, useRef, useState, useContext } from "preact/hooks";
import Message  from "../types/types";
import SocketContext from "./SocketContext";

const MemberList = () => {
    const ws = useContext(SocketContext);

    return (
        <div class="flex flex-col justify-between bg-white h-auto rounded-lg mt-10 px-5 py-2">
            <h>Connected</h>
            <div class="flex flex-col">
                {ws.members.map((member) => (
                    <p>{member}</p>
                ))}
            </div>
        </div>
    );
}

export default MemberList;