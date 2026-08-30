const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
    .keys({
        PORT: Joi.number().default(4000),
        MONGODB_URL: Joi.string().required().description('Mongo DB url'),
        JWT_SECRET: Joi.string().default('devsecret'),
        JWT_EXPIRES: Joi.string().default('7d'),
    })
    .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
    port: envVars.PORT,
    mongoose: {
        url: envVars.MONGODB_URL,
    },
    jwt: {
        secret: envVars.JWT_SECRET,
        expires: envVars.JWT_EXPIRES,
    },
};
