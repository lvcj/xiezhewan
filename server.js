const http = require('http')
const axios = require('axios')
// 为了方便我们启动时直接打开浏览器

const { exec } = require('child_process')
const open = url => {
    switch (process.platform) {
        case 'darwin':
            exec(`open ${url}`)
            break;
        case 'win32':
            exec(`start ${url}`)
            break;
        default:
            break;
    }
}

class Server {
    constructor() {
    }

    start() {
        const serve = http.createServer((req, res) => {
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/plain;charset=utf-8')
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.end('我的第一个服务器')
        })
        serve.listen(3000, '127.0.0.1',() => {
            console.log('我在 http://127.0.0.1:3000 启动了')
            open('http://127.0.0.1:3000')
        })
    }
}

app = new Server()
app.start()