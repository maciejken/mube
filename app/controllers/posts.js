const postService = require('../services').posts

module.exports = {
    getPosts(req, res) {
            postService.getPostsBySlug(req, res).then(posts => {
            res.status(200).json(posts);
        })
    }
}
