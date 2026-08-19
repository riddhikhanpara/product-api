const express = require('express');
const cors = require('cors');
const httpStatus = require('http-status');
const routes = require('./routes/v1');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/apiError');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options('*', cors());

app.get('/health', (req, res) => {
    res.json({ ok: true });
});

app.use('/v1', routes);

app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'route not found'));
});

app.use(errorConverter);
app.use(errorHandler);

module.exports = app;
