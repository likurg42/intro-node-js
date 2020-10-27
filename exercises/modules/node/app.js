const { getPostsForUser, getUserById } = require('./api.js');

const showPostsForCurrentUser = (userId, cb) => {
    getPostsForUser(userId, (posts) => {
        const postTemplates = posts.map((post) => {
            return `
                <div>
                    <p>${post.title}</p>
                    <p>${post.body}</p>
                    <p>${post.createdBy}</p>
                </div>
            `
        })
        cb(postTemplates);
    })
}

const showUserProfile = (userId, cb) => {
    getUserById(userId, (user) => {
        console.log(user);
        userTemplate = `
            <div>
                <p>${user.id}</p>
                <p>${user.name}</p>
            </div>
        `;
    })
    cb(userTemplate);
}


module.exports = { showPostsForCurrentUser, showUserProfile };