const rp = require('request-promise')

module.exports = {
    getPostsBySlug: (slug) => {
        const options = {
            uri: `https://malauczelnia.pl/wp/wp-json/wp/v2/posts`,
            qs: {
                slug: slug
            },
            json: true
        }
        return rp(options)
    }
}