const path = require('path');

const debug = require('debug')('lib:dotenv');

const envFilepath = path.join(process.cwd(), '.env');
const result = require('.').config({
  path: envFilepath
});

if (result.error && result.error instanceof Error) {
  debug('ERROR: Could not load env file `%s`', envFilepath);
  throw result.error;
} else {
  debug('INFO: Loaded env file `%s`', envFilepath);
  debug('INFO: Keys loaded `%o`', Object.keys(result.parsed));
}