import { w3cwebsocket as WebSocketClient } from "websocket";

const url = "wss://api.bitfinex.com/ws/2";
const ws = new WebSocketClient(url);

ws.onerror = (error) => {
  console.log(`Konekcija nije uspostavljena: ${error}`);
};

export default ws;
