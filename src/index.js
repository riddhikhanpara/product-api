const app = require('./app');
const config = require('./config/config');
const connectDB = require('./db/dbConnection');

connectDB();

app.listen(config.port, () => {
    console.log('Listening to port ' + config.port);
});
