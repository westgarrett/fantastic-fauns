from fastapi import FastAPI, websockets
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
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
async def read_root() -> dict:
    return {"message": "Hello World"}

@app.get("/ws", tags=['ws'])
async def websocket_endpoint(websocket: websockets.WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_json()
        if data['type'] == 'draw':
            await websocket.send_json({"point": data['points']})
        if data['type'] == 'clear':
            await websocket.send_json({"clear": True})
        if data['type'] == 'message':
            await websocket.send_json({"message": data['message']})
        if data['type'] == 'join':
            print("join event working")
            await websocket.send_json({"message": "Welcome to the chat! " + data['user']})