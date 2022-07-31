"""
Backend using FastAPI
"""
from multiprocessing import connection
from typing import List, Dict
import asyncio

from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware

app: FastAPI = FastAPI()

origins: List[str] = [
    "https://localhost:3000",
    "localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

@app.get("/", tags=['root'])
async def read_root() -> Dict:
    return {"message": "Hello World"}

class ConnectionManager:
    def __init__(self):
        self.connections: dict[str, WebSocket] = {}
        self.userlist: List[str] = []
        self.messages = []

    async def connect(self, websocket: WebSocket, user: str):
        await websocket.accept()
        self.connections[user] = websocket

    async def disconnect(self, websocket: WebSocket, user: str):
        del self.connections[user]

    async def broadcast(self, data: dict):
        for id in self.connections.keys():
            await self.connections[id].send_json(data)

manager = ConnectionManager()

@app.websocket("/ws/{user}")
async def websocket_endpoint(user: str, websocket: WebSocket):
    await manager.connect(websocket, user)
    while True:
        data = await websocket.receive_json()
        #handle disconnect
        # get members
        if data['type'] == 'draw':
            await websocket.send_json({"point": data['points']})
            
        if data['type'] == 'clear':
            await websocket.send_json({"clear": True})

        if data['type'] == 'message':
            await manager.broadcast({'user': 'server', 'type': 'message', 'message': data['message']})
            
        if data['type'] == 'leave':
            manager.disconnect(websocket, data['user'])
            await manager.broadcast({'user': 'server', 'type': 'message', 'message': data['user']})

        if data['type'] == 'join':
            await manager.broadcast({'type': 'message', 'message': user + ' has joined the room'})
    