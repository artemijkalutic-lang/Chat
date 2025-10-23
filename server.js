const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // <-- важно, чтобы index.html и app.js работали

let messages = [];

app.post('/send', (req, res) => {
  messages.push({ text: req.body.text });
  res.sendStatus(200);
});

app.get('/messages', (req, res) => {
  res.json(messages);
});

app.listen(3000, () => console.log('✅ Server started on http://localhost:3000'));
