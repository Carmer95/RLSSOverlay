import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import http from 'http';
import { WebSocketServer } from 'ws';

const app = express();
const PORT = 1234; // Port for App 2

// Global in-memory state
let panelData = {
  currentGame: 1,
  bestOf: 5,
  blueWins: 0,
  orangeWins: 0,
  blueLogo: '',
  orangeLogo: ''
};

app.use(cors());
app.use(bodyParser.json());

// Create an HTTP server from Express app
const server = http.createServer(app);

// Create WebSocket server using the same HTTP server
const wss = new WebSocketServer({ server });

function broadcastPanelData() {
  const message = JSON.stringify({ type: 'panelData', data: panelData });
  wss.clients.forEach(client => {
    if (client.readyState === client.OPEN) {
      client.send(message);
    }
  });
}

wss.on('connection', (ws) => {
  console.log('WebSocket client connected');

  // Send current panelData on connection
  ws.send(JSON.stringify({ type: 'panelData', data: panelData }));

  ws.on('message', (message) => {
    console.log('Received message from client:', message);
    // You could handle incoming WS messages here if needed
  });

  ws.on('close', () => {
    console.log('WebSocket client disconnected');
  });
});

// Handle POST requests to update data
app.post('/api/data', (req, res) => {
  const {
    incrementGame,
    resetGame,
    setGameNumber,
    bestOf,
    incrementBlueWin,
    incrementOrangeWin,
    resetWins,
    blueWins,
    orangeWins,
    blueLogo,
    orangeLogo
  } = req.body;

  let changed = false;

  if (incrementGame) {
    if (typeof panelData.bestOf !== 'number' || panelData.bestOf < 1) {
      panelData.bestOf = 5;
      console.warn('Invalid or missing bestOf. Defaulting to 5.');
    }

    panelData.currentGame += 1;

    if (panelData.currentGame > panelData.bestOf) {
      panelData.currentGame = 1;
    }
    changed = true;
  }

  if (resetGame) {
    panelData.currentGame = 1;
    panelData.blueWins = 0;
    panelData.orangeWins = 0;
    changed = true;
  }

  if (typeof setGameNumber === 'number') {
    panelData.currentGame = setGameNumber;
    changed = true;
  }

  if (typeof bestOf === 'number') {
    panelData.bestOf = bestOf;
    changed = true;
  }

  if (incrementBlueWin) {
    panelData.blueWins += 1;
    changed = true;
  }

  if (incrementOrangeWin) {
    panelData.orangeWins += 1;
    changed = true;
  }

  if (resetWins) {
    panelData.blueWins = 0;
    panelData.orangeWins = 0;
    changed = true;
  }

  if (typeof blueWins === 'number') {
    panelData.blueWins = blueWins;
    changed = true;
  }

  if (typeof orangeWins === 'number') {
    panelData.orangeWins = orangeWins;
    changed = true;
  }

  if (typeof blueLogo === 'string') {
  const trimmedBlueLogo = blueLogo.trim();
  if (panelData.blueLogo !== trimmedBlueLogo) {
    panelData.blueLogo = trimmedBlueLogo;
    changed = true;
  }
  }

  if (typeof orangeLogo === 'string') {
    const trimmedOrangeLogo = orangeLogo.trim();
    if (panelData.orangeLogo !== trimmedOrangeLogo) {
      panelData.orangeLogo = trimmedOrangeLogo;
      changed = true;
    }
  }


  if (changed) {
    broadcastPanelData();
    console.log('Broadcasted updated panelData:', panelData);
  }

  res.json({ message: changed ? 'Panel data updated' : 'No changes applied', panelData });
});

app.get('/api/data', (req, res) => {
  if (panelData && Object.keys(panelData).length > 0) {
    res.status(200).json(panelData);
  } else {
    res.status(404).json({ message: 'No data available yet' });
  }
});

app.get('/', (req, res) => {
  res.send('Server is up');
});

// Listen on the HTTP server, which also handles WebSocket
server.listen(PORT, () => {
  console.log(`Server (HTTP + WebSocket) running at http://localhost:${PORT}`);
});