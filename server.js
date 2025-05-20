import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

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
  } = req.body;

  // Handle "Next Game"
  if (incrementGame) {
    panelData.currentGame += 1;
    return res.json({ message: 'Game incremented', panelData });
  }

  // Handle "Reset Game"
  if (resetGame) {
    panelData.currentGame = 1;
    panelData.blueWins = 0;
    panelData.orangeWins = 0;
    return res.json({ message: 'Series reset', panelData });
  }

  // Handle manual override
  if (typeof setGameNumber === 'number') {
    panelData.currentGame = setGameNumber;
    return res.json({ message: `Game set to ${setGameNumber}`, panelData });
  }

  // Update best-of value
  if (typeof bestOf === 'number') {
    panelData.bestOf = bestOf;
    return res.json({ message: `Best of set to ${bestOf}`, panelData });
  }

  if (incrementBlueWin) {
    panelData.blueWins += 1;
    return res.json({ message: `Blue wins incremented to ${panelData.blueWins}`, panelData });
  }

  if (incrementOrangeWin) {
    panelData.orangeWins += 1;
    return res.json({ message: `Orange wins incremented to ${panelData.orangeWins}`, panelData });
  }

  if (resetWins) {
    panelData.blueWins = 0;
    panelData.orangeWins = 0;
    return res.json({ message: 'Wins reset', panelData });
  }

  console.log('Updated state:', message , panelData);
  res.status(200).json({ message: 'Data received', data: panelData });
});





// Handle GET requests to return current panel data
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


app.listen(PORT, () => {
  console.log(`Overlay server running at http://localhost:${PORT}`);
});