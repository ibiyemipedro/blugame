const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const userRoute = require('./routes/users/auth.route');
const gameRoute = require('./routes/game/game.route');


const db = require('./config/mongoose');
const loggerMiddleware = require('./utils/middlewares/logger');

const app = express();

const port = process.env.PORT || 3250;

// CORS middleware
app.use(cors())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-HEaders', 'Content-Type, Authorization');
  next();
});

app.use(loggerMiddleware.loggerMiddleware);

app.use(bodyParser.json());

app.use('/', userRoute);
app.use('/game', gameRoute);

app.use('/', (req, res, next) => res.status(404).json({ message: 'Page not found.' }));

// Global error handler
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message || 'Internal server error';
  const data = error.data;
  res.status(status).json({
    message,
    data
  })
});

(async () => {
  try {
    await db.mongoConnection();
    const server = app.listen(port, () => {
      console.log(`server starting on port: ${port}`)
    });
    const io = require("./socket").init(server);

    io.on('connection', socket => {
      console.log('Client connected to socket')
    })

  } catch (error) {
    console.log(error);
    console.log('Mongo connection error')
  }
})()


