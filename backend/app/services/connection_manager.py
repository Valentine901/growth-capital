from collections import defaultdict
from fastapi import WebSocket 


class ConnectionManager:
    def __init__(self):
        self.rooms: dict[str, set[WebSocket]] = defaultdict(set)

    async def connect(self, conversation_id: str, ws: WebSocket):
        await ws.accept()
        self.rooms[conversation_id].add(ws)

    def disconnect(self, conversation_id: str, ws: WebSocket):
        self.rooms[conversation_id].discard(ws)
        if not self.rooms[conversation_id]:
            del self.rooms[conversation_id]

    async def broadcast(self, conversation_id: str, data: dict):
        for ws in list(self.rooms.get(conversation_id, [])):
            try:
                await ws.send_json(data)
            except Exception:
                self.disconnect(conversation_id, ws)

manager = ConnectionManager()