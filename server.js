import http from 'http';
import WebSocket, { WebSocketServer } from 'ws';

// Config
const PORT = 1234;

// In-memory panel data
let panelData = {
  currentGame: 1,
  bestOf: 1,
  blueWins: 0,
  orangeWins: 0,
  blueLogo: '',
  orangeLogo: '',
  startSeries: false,
  seriesOver: false,
  seriesInfo: '',
  overlayVisible: false
};

// Create HTTP server (only needed to bootstrap WS)
const server = http.createServer();
const wss = new WebSocketServer({ server });

// Broadcast function
function broadcastPanelData() {
  const message = JSON.stringify({ type: 'panelData', data: panelData });
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

// Handle WebSocket connections
wss.on('connection', (ws) => {
  console.log('WebSocket client connected');
  ws.send(JSON.stringify({ type: 'panelData', data: panelData }));

  ws.on('message', (data) => {
    try {
      const msg = JSON.parse(data.toString());
      let changed = false;

      if ('startSeries' in msg) {
        panelData.startSeries = msg.startSeries;
        changed = true;
      }

      if ('seriesOver' in msg) {
        panelData.seriesOver = msg.seriesOver;
        changed = true;
      }

      if ('overlayVisible' in msg) {
        panelData.overlayVisible = msg.overlayVisible;
        changed = true;
      }

      if (typeof msg.seriesInfo === 'string') {
        panelData.seriesInfo = msg.seriesInfo;
        changed = true;
      }

      if (typeof msg.setGameNumber === 'number') {
        panelData.currentGame = msg.setGameNumber;
        changed = true;
      }

      if (typeof msg.bestOf === 'number') {
        panelData.bestOf = msg.bestOf;
        changed = true;
      }

      if (typeof msg.blueWins === 'number') {
        panelData.blueWins = msg.blueWins;
        changed = true;
      }

      if (typeof msg.orangeWins === 'number') {
        panelData.orangeWins = msg.orangeWins;
        changed = true;
      }

      if (typeof msg.blueName === 'string') {
        panelData.blueName = msg.blueName;
        changed = true;
      }

      if (typeof msg.orangeName === 'string') {
        panelData.orangeName = msg.orangeName;
        changed = true;
      }

      if (typeof msg.blueLogo === 'string') {
        const trimmed = msg.blueLogo.trim();
        if (panelData.blueLogo !== trimmed) {
          panelData.blueLogo = trimmed;
          changed = true;
        }
      }

      if (typeof msg.orangeLogo === 'string') {
        const trimmed = msg.orangeLogo.trim();
        if (panelData.orangeLogo !== trimmed) {
          panelData.orangeLogo = trimmed;
          changed = true;
        }
      }

      if (msg.resetGame) {
        panelData = {
          ...panelData,
          currentGame: 1,
          blueWins: 0,
          orangeWins: 0,
          startSeries: false,
          seriesOver: false,
          overlayVisible: false
        };
        changed = true;
      }

      if (changed) {
        console.log('Broadcasting updated panelData:', panelData);
        broadcastPanelData();
      }
    } catch (err) {
      console.error('Error parsing WebSocket message:', err);
    }
  });

  ws.on('close', () => {
    console.log('WebSocket client disconnected');
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`WebSocket server running at ws://localhost:${PORT}`);
});
