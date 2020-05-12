const express = require('express');
const axios = require('axios')
const cors = require('cors')

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: true }))

app.get('/', (req, res, next) => {
  if (req.query.switch === 'stop') {
    res.status(200).send('Blocked!').end()
    return 
  }
  next()
},(req, res) => {
    res.status(200).send('Hello from GCP app engine Cloud Messaging!').end()
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

module.exports = app;