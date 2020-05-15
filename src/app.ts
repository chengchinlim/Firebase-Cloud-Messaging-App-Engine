const express = require('express')
const axios = require('axios')
const cors = require('cors')
// const dotenv = require('dotenv')
const bunyan = require('bunyan')
const lb = require('@google-cloud/logging-bunyan')

export const GOOGLE_APPLICATION_CREDENTIALS='/Users/chengchinlim/BackendProjects/firebase-cloud-messaging-service-account-key.json'

const startServer = async () => {
    const { logger, mw } = await lb.express.middleware()

    const app = express();
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cors({ origin: true }))
    app.use(mw)

// const loggingBunyan = new lb.LoggingBunyan()

// const logger = bunyan.createLogger({
//   name: 'my-service',
//   streams: [
//     { level: 'info', stream: process.stdout },
//     loggingBunyan.stream('info')
//   ]
// })

    app.get('/', (req, res, next) => {
      if (req.query.switch === 'stop') {
        // logger.error({
        //   labels: {
        //     issue: 'ooops',
        //     solution: 'should be ok'
        //   } 
        // }, 'Testing info logging')
        req.log.error({
          labels: {
            issue: 'ooops',
            solution: 'should be ok'
          }
        }, 'Error message')
        res.status(200).send('Blocked!').end()
        return 
      }
      next()
    },(req, res) => {
        logger.error('Testing error logging')
        res.status(200).send('Hello from GCP app engine Cloud Messaging!').end()
    });

    // Start the server
    const PORT = process.env.PORT || 8888;
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
      console.log('Press Ctrl+C to quit.');
    });

}

startServer()