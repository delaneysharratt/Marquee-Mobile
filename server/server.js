const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

/** ---------- ROUTE INCLUDES ---------- **/
const userRouter = require('./routes/user.router');
const discoverRouter = require('./routes/discover.router');
const searchRouter = require('./routes/search.router');
const watchRouter = require('./routes/watch.router');
const friendRouter = require('./routes/friend.router');

/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//password session configuration//
app.use(sessionMiddleware);

//startup passport sessions//
app.use(passport.initialize());
app.use(passport.session());

/** ---------- ROUTES ---------- **/
app.use('/api/user', userRouter);
app.use('/api/discover', discoverRouter);
app.use('/api/search', searchRouter);
app.use('/api/watch', watchRouter);
app.use('/api/friend', friendRouter);

// Serve static files //
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** ---------- LISTEN ---------- **/
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
