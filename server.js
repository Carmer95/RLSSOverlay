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
  console.log('Data received:', data);

  // Respond to App 1
  res.status(200).json({ message: 'Data received successfully', receivedData: data });
});

app.get('/api/data', (req, res) => {
  if (latestData) {
    res.status(200).json(latestData);
  } else {
    res.status(404).json({ message: 'No data available yet' });
  }
});

app.listen(PORT, () => {
  console.log(`App 2 running on http://localhost:${PORT}`);
});

