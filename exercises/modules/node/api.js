const data = require('./data.js');


const getUserById = (id, cb) => {
    const user = data.users.find(user => user.id === id)
    cb(user)
}
const getPostsForUser = (userId, cb) => {
    // simulate API call
    const posts = data.posts.filter(post => post.createdBy === userId)
    cb(posts)
}

module.exports = { getPostsForUser, getUserById };