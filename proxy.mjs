import express from 'express';
import request from 'request';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());

app.get('/proxy', (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).send('URL is required');
  }

  request({ url, encoding: null }, (err, resp, buffer) => {
    if (err) {
      return res.status(500).send('Error fetching image');
    }
    res.set('Content-Type', resp.headers['content-type']);
    res.send(buffer);
  });
});

app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});