import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = 1234; // Port for App 2
// let panelData = null;
let currentGame = 1;
let bestOf = 5;

app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json()); // Parse incoming JSON requests

app.post('/api/data', (req, res) => {
  const data = req.body;

  // Example: increment game only when control panel says to
  if (data.incrementGame) {
    currentGame += 1;
  }

  // Optional: allow reset
  if (data.resetGame) {
    currentGame = 1;
  }

  // Optional: manually override
  if (typeof data.setGameNumber === 'number') {
    currentGame = data.setGameNumber;
  }

  // Update best-of if needed
  if (typeof data.bestOf === 'number') {
    bestOf = data.bestOf;
  }

  const fullPayload = {
    ...data,
    currentGame,
    bestOf,
  };

  console.log('Updated state:', fullPayload);
  res.status(200).json({ message: 'Data received', data: fullPayload });
});

// Endpoint to receive data
// app.post('/api/data', (req, res) => {
//   panelData = req.body;
//   console.log('Data received:', panelData);

//   // Respond to App 1
//   res.status(200).json({ message: 'Data received successfully', receivedData: panelData });
// });

app.get('/api/data', (req, res) => {
  console.log(res);
  if (panelData && Object.keys(panelData).length > 0) {
    res.status(200).json(panelData);
  } else {
    res.status(404).json({ message: 'No data available yet' });
  }
});

app.get('/', (req, res) => {
  res.send('Server is up');
});

app.listen(PORT, () => {
  console.log(`App 2 running on http://localhost:${PORT}`);
});

