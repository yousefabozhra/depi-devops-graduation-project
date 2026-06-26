/**
 * @file server.js
 * @description Entry point for the Amazona Backend Application.
 */

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

import config from './config.js';

import userRoute from './routes/userRoute.js';
import productRoute from './routes/productRoute.js';
import orderRoute from './routes/orderRoute.js';
import uploadRoute from './routes/uploadRoute.js';


// ----------------------------------------------------------------------------
// Database Connection
// ----------------------------------------------------------------------------

const mongodbUrl =
  process.env.MONGODB_URL || config.MONGODB_URL;


console.log('→ Connecting to MongoDB at:', mongodbUrl);


mongoose
  .connect(mongodbUrl)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((error) =>
    console.log('❌ MongoDB connection error:', error.message)
  );



// ----------------------------------------------------------------------------
// App Configuration
// ----------------------------------------------------------------------------

const app = express();



const corsOptions = {

  origin: function (origin, callback) {

    if (!origin) {
      return callback(null, true);
    }

    return callback(null, true);

  },


  methods: [
    'GET',
    'POST',
    'PUT',
    'DELETE',
    'OPTIONS'
  ],


  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With'
  ],


  credentials: true

};



app.use(cors(corsOptions));

app.use(bodyParser.json());



// ----------------------------------------------------------------------------
// Logging Middleware
// ----------------------------------------------------------------------------

app.use((req, res, next) => {


  console.log(
    `${new Date().toISOString()} - ${req.method} ${req.url} - Host: ${req.get('host')}`
  );


  next();

});



// ----------------------------------------------------------------------------
// Health Check
// ----------------------------------------------------------------------------


app.get('/api/health', (req, res) => {


  res.status(200).json({

    status: 'healthy',

    timestamp: new Date().toISOString(),

    uptime: process.uptime(),

    environment:
      process.env.NODE_ENV || 'development'

  });


});





app.get('/api/test', (req, res) => {


  res.status(200).json({

    message: 'API is working!',


    host: req.get('host'),


    ip: req.ip,


    headers: {

      'user-agent': req.get('user-agent'),

      'x-forwarded-for':
        req.get('x-forwarded-for'),

      'x-real-ip':
        req.get('x-real-ip')

    }


  });


});





// ----------------------------------------------------------------------------
// API Routes
// ----------------------------------------------------------------------------


app.use('/api/uploads', uploadRoute);

app.use('/api/users', userRoute);

app.use('/api/products', productRoute);

app.use('/api/orders', orderRoute);





// ----------------------------------------------------------------------------
// Paypal Config
// ----------------------------------------------------------------------------


app.get('/api/config/paypal', (req, res) => {


  res.send(config.PAYPAL_CLIENT_ID);


});






// ----------------------------------------------------------------------------
// Static Upload Files Only
// ----------------------------------------------------------------------------

app.use(
  '/uploads',
  express.static('uploads')
);






// ----------------------------------------------------------------------------
// Error Handling
// ----------------------------------------------------------------------------


app.use((error, req, res, next) => {


  console.error('Error occurred:', error);


  res.status(error.status || 500).json({


    message: error.message,


    error:
      process.env.NODE_ENV === 'production'
        ? {}
        : error


  });


});






// ----------------------------------------------------------------------------
// Server Initialization
// ----------------------------------------------------------------------------


app.listen(config.PORT, () => {


  console.log(
    `🚀 Server started on port ${config.PORT}`
  );


});



export default app;