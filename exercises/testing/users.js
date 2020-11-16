const users = new Array(20)
    .fill(0)
    .map((_, i) => {
        return {
            id: i,
            createdAt: Date.now() + i,
            email: `readycoder${i}@gmail.com`
        }
    })

const fixId = (id) => parseInt(id);

// simulate async db call with promise
const findUser = async (id) => {
    try {
        id = fixId(id);
        const user = await users.find(user => user.id === id)
        if (user) {

            return user
        }
        new Error(`No user with id "${id}"`)
    } catch (err) {
        console.error(err);
    }
}

// simulate async db call with promise
const deleteUser = async (id) => {
    try {
        id = fixId(id);
        const i = await users.findIndex(user => user.id === id)

        if (i < 0) {
            new Error(`No user with id "${id}"`)
        }

        users.slice(i, 1)
        return id;

    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    findUser,
    deleteUser
}

