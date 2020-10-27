const fs = require('fs')
const path = require('path')

// this path needs to be relative to work with fs
const contactsLocation = 'contacts.json'

/**
 * should read the contacts at the
 * @contactsLocation path and convert
 * it to a js object
 */
const getContacts = (cb) => {
    fs.readFile(path.resolve(__dirname, './contacts.json'), { encoding: "utf-8" }, (err, data) => {
        if (err) console.error(err);
        cb(JSON.parse(data));
    })
}

/**
 * takes a contacts object, converts it to JSON
 * and saves it at the @contactsLocation path
 * @param {Object} contacts contacts object
 */
const saveContacts = (contacts) => {
    fs.writeFile(path.resolve(__dirname, './contacts.json'), JSON.stringify(contacts), (err) => { if (err) console.error(err) });
}

module.exports = {
    contactsLocation,
    getContacts,
    saveContacts
}

