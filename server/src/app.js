import express from 'express';
import volleyball from 'volleyball';
import '@babel/polyfill';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import routes from './routes';

dotenv.config();
const { DATABASE_URL } = process.env;

// Set up the express app
const app = express();
app.use(cors());

// Log requests to the console.
app.use(volleyball);
// Mongo Connection Set-Up
try {
  mongoose.connect(DATABASE_URL, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('Database connection successful');
} catch (error) {
  console.log('Database connection error: ', error);
}
const mydb = mongoose.connection;
// Bind connection to error event (to get notification of connection errors)
mydb.on('error', (error) =>
  console.error.bind(console, 'MongoDB connection error: ', error)
);

// parse request body content
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

// Setup a default catch-all route.
app.get('*', (req, res) =>
  res.status(404).json({
    message: 'Page not found',
  })
);

export default app;
