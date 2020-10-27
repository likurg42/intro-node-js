const data = require('./data.js');
const api = require('./api.js');
const app = require('./app.js');

// import data from './data.js';
// import api from './api.js';
// import app from './app.js';

describe('data', () => {
    test('users', () => {
        expect(data.users).toHaveLength(2)
    })
    test('posts', () => {
        expect(data.posts).toHaveLength(4)
    })
})

describe('api', () => {
    test('getUserById', done => {
        expect.assertions(1)
        api.getUserById(1, user => {
            expect(user.id).toBe(1)
            done()
        })
    })

    test('getUserById', done => {
        expect.assertions(1)
        api.getUserById(2, user => {
            expect(user.id).toBe(2)
            done()
        })
    })

    test('getPostsForUser', done => {
        api.getPostsForUser(1, posts => {
            expect(posts).toHaveLength(3)
            posts.forEach(post => {
                expect(post.createdBy).toBe(1)
            })
            done()
        })
    })

    test('getPostsForUser', done => {
        api.getPostsForUser(2, posts => {
            expect(posts).toHaveLength(1)
            posts.forEach(post => {
                expect(post.createdBy).toBe(2)
            })
            done()
        })
    })
})

describe('app', () => {
    test('showPostsForCurrentUser', done => {
        app.showPostsForCurrentUser(1, posts => {
            expect(posts).toHaveLength(3)
            done()
        })
    })

    test('showPostsForCurrentUser', done => {
        app.showPostsForCurrentUser(2, (posts) => {
            expect(posts).toHaveLength(1);
            done()
        })
    })

    test('showUserProfile', done => {
        app.showUserProfile(1, profile => {
            expect(profile).toBeTruthy()
            done()
        })
    })
    test('showUserProfile', done => {
        app.showUserProfile(2, profile => {
            expect(profile).toBeTruthy()
            done()
        })
    })
})
