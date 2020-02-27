require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require ('cors');
const helmet = require('helmet');
const annualGoalsRouter = require('./goals/annual-goals-router');
const monthlyGoalsRouter = require('./goals/monthly-goals-router');
const weeklyGoalsRouter = require('./goals/weekly-goals-router');

const validateBearerToken = require('./validate-bearer-token')
const errorHandler = require('./error-handler')

const { NODE_ENV } = require('./config');
const app = express();

const morganOption = (NODE_ENV === 'production')? 'tiny' : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
// app.use(validateBearerToken);

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.use('/api/annualGoals', annualGoalsRouter);
app.use('/api/monthlyGoals', monthlyGoalsRouter);
app.use('/api/weeklyGoals', weeklyGoalsRouter);

app.use(errorHandler);

module.exports = app;