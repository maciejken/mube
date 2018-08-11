const db = require('../../libs/db')

module.exports = {
    getPostsBySlug: (slug) => {
        const collection = db.get().db('mudb').collection('posts')
        return new Promise((resolve, reject) => {
            Promise.resolve(collection.find({ slug: slug }))
            .then(res => res.toArray((err, posts) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(posts)
                }
            }))
        })
    },
    insertPost: (post) => {
        const collection = db.get().db('mudb').collection('posts')
        return new Promise((resolve, reject) => {
            Promise.resolve(collection.insert(post)).then((res, err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(res.ops) 
                }
            })
        })
    }
}
