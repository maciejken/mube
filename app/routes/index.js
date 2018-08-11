const postController = require('../controllers').posts;

module.exports = function (app) {

    app.get('/wp/wp-json/wp/v2/posts', postController.getPosts);

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handler
    // no stacktraces leaked to user unless in development environment
    app.use(function (err, req, res, next) {
        res.status(err.status || 500).json({
            status: 'error',
            message: err.message,
            error: (process.env.NODE_ENV === 'development') ? err.stack : {}
        });
    });
};