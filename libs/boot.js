'use strict';
const logger = require('winston');
const https = require('https');
const http = require('http');
const fs = require('fs');
const db = require('./db')

module.exports = function (app) {
    let port;
    let server;

    if (process.env.NODE_ENV === 'test') {
        const credential = {
            key: fs.readFileSync('private.key', 'utf8'),
            cert: fs.readFileSync('public.crt', 'utf8'),
            requestCert: false,
            rejectUnauthorized: false
        };
        port = normalizePort(process.env.PORT || process.env.PORT_HTTPS || 81);
        server = https.createServer(credential, app);
    } else {
        port = normalizePort(process.env.PORT || process.env.PORT_HTTP || 80);
        server = http.createServer(app);
    }
    db.connect('mongodb://localhost:27017/mudb', (err, database) => {
        if (err) {
            logger.error('Unable to connect to MongoDB')
            process.exit(1)
        } else {
            server
                .listen(port)
                .on('error', onError)
                .on('listening', onListening);
        }
    })
    

    /**
     * Normalize a port into a number, string, or false.
     */
    function normalizePort(val) {
        const port = parseInt(val, 10);

        if (isNaN(port)) {
            // named pipe
            return val;
        }

        if (port >= 0) {
            // port number
            return port;
        }

        return false;
    }

    /**
     * Event listener for HTTP server "error" event.
     */
    function onError(error) {
        if (error.syscall !== 'listen') {
            throw error;
        }

        const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                logger.error(bind, 'requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                logger.error(bind, 'is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    /**
     * Event listener for HTTP server "listening" event.
     */
    function onListening() {
        const addr = server.address();
        const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;

        logger.info('App listening on ', bind);
    }
};
