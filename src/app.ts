const express = require('express')
const axios = require('axios')
const cors = require('cors')
const admin = require('firebase-admin')

require('custom-env').env('test')

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: true }))

app.get('/',(req, res) => {
    console.log(`Stripe live key: ${process.env.STRIPE_TEST_KEY}`)
    res.status(200).send('Hello from GCP app engine Cloud Messaging! (Prod)').end()
});

const defaultApp = admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://cloudmessaging-5227.firebaseio.com'
})

const otherAppServiceAccountPath = '/Users/chengchinlim/Backend/cloud-functions-5227-key.json'
const otherApp = admin.initializeApp({
    credential: admin.credential.cert(otherAppServiceAccountPath),
    databaseURL: 'https://cloud-functions-5227.firebaseio.com'
}, 'other')

app.get('/default', (req, res) => {
    const db = defaultApp.firestore()
    db.collection('ids')
        .doc('test')
        .get()
        .then(doc => {
            const data = doc.data()
            if (data) {
                console.log(`test: ${data['test']}`)
                res.status(200).send('Success')
            } else {
                res.status(400).send('Failed')
            }
        }).catch(err => {
            res.status(400).send(err)
        })
})

app.get('/other', (req, res) => {
    const db = otherApp.firestore()
    db.collection('fruits')
        .doc('N4h0ubC6CuRgGFmqbbAI')
        .get()
        .then(doc => {
            const data = doc.data()
            if (data) {
                console.log(`name: ${data['name']}`)
                res.status(200).send('Success')
            } else {
                res.status(400).send('Failed')
            }
        }).catch(err => {
            res.status(400).send(err)
        })
})

// Start the server
const PORT = process.env.PORT || 8888;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});