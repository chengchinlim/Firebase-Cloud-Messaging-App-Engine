const express = require('express')
const axios = require('axios')
const cors = require('cors')
require('custom-env').env('test')

// export const GOOGLE_APPLICATION_CREDENTIALS='/Users/chengchinlim/BackendProjects/firebase-cloud-messaging-service-account-key.json'

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: true }))

app.get('/',(req, res) => {
    console.log(`Stripe live key: ${process.env.STRIPE_TEST_KEY}`)
    res.status(200).send('Hello from GCP app engine Cloud Messaging! (Dev)').end()
});

// Start the server
const PORT = process.env.PORT || 8888;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});