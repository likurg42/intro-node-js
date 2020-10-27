const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')

/**
 * this function is blocking, fix that
 * @param {String} name full file name of asset in asset folder
 */
const findAsset = async (name) => {
    const assetPath = path.join(__dirname, 'assets', name)
    const asset = await fs.promises.readFile(assetPath, { encoding: 'utf-8' });
    return asset;
}

const hostname = '127.0.0.1'
const port = 3000

const router = {
    '/': {
        method: 'GET',
        assetName: 'index.html',
        mime: 'text/html'
    },
    '/style.css': {
        method: 'GET',
        assetName: 'style.css',
        mime: 'text/css'
    }
}

// log incoming request coming into the server. Helpful for debugging and tracking
const logRequest = (method, route, status) => console.log(method, route, status)

const server = http.createServer((req, res) => {
    const method = req.method
    const route = url.parse(req.url).pathname
    if (router[route]) {
        findAsset(router[route].assetName)
            .then((asset) => {
                res.writeHead(200, { 'Content-Type': router[route].mime })
                logRequest(method, route, res.statusCode);
                res.write(asset);
                res.end();
            })
            .catch((err) => {
                res.writeHead(404)
                logRequest(method, route, res.statusCode);
                console.error(err);
                res.end();
            })
    } else {
        res.writeHead(404);
        logRequest(method, route, res.statusCode);
        res.end();
    }
    // this is sloppy, especially with more assets, create a "router"

    // if (route === '/') {
    //     res.writeHead(200, { 'Content-Type': 'text/html' })
    //     findAsset('index.html').then(res.write).catch(console.error);
    //     logRequest(method, route, 200)
    //     res.end()
    // }
    // else {
    //     console.log('other route', route);
    //     // missing asset should not cause server crash
    //     throw new Error('route not found')
    //     res.end()
    // }
    // most important part, send down the asset
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})
