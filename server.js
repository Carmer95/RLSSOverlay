import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = 1234; // Port for App 2
let panelData = null;

app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json()); // Parse incoming JSON requests

// Endpoint to receive data
app.post('/api/data', (req, res) => {
  panelData = req.body;
  console.log('Data received:', panelData);

  // Respond to App 1
  res.status(200).json({ message: 'Data received successfully', receivedData: panelData });
});

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

