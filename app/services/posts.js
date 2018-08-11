const postUtils = require('../utils').postUtils
const wpApi = require('../gateways').wpApi

module.exports = {
    getPostsBySlug: (req, res) => {
        return new Promise((resolve, reject) => {
            postUtils.getPostsBySlug(req.query.slug).then((posts, err) => {
                if (err) {
                    reject(err);
                } else {
                    if (posts.length > 0) {
                        resolve(posts);
                    } else {
                        return wpApi.getPostsBySlug(req.query.slug).then((wpPosts) => {
                            const post = {
                                slug: req.query.slug,
                                excerpt: wpPosts[0].excerpt,
                                content: wpPosts[0].content
                            }
                            return postUtils.insertPost(post) 
                        }).then(res => resolve(res))
                    }  
                }
            });
        });     
    }
}