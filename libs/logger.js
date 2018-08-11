'use strict';
const winston = require('winston');
const fs = require('fs');

const level = process.env.LOG_LEVEL || 'debug';
const tsFormat = function () {
    return (new Date()).toLocaleTimeString();
};

if (!fs.existsSync('logs')) {
    fs.mkdirSync('logs');
}
const logger = winston.createLogger({
    level: level,
    format: 'simple',
    transports: [
      //
      // - Write to all logs with level `info` and below to `combined.log` 
      // - Write all logs error (and below) to `error.log`.
      //
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
      new winston.transports.Console({
          colorize: true,
          level: level,
          format: winston.format.simple()
      })
    ]
});
// logger.remove(logger.transports.Console);
// logger.add(logger.transports.Console, {
//         colorize: true,
//         level: 'info',
//         timestamp: tsFormat
//     }
// );
// logger.add(logger.transports.File, {
//         colorize: true,
//         level: level,
//         filename: 'logs/server.log',
//         maxsize: 1024000,
//         maxFiles: 5,
//         timestamp: tsFormat
//     }
// );

module.exports = logger;