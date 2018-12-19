const http = require('http')
const url = require('url')
const fs = require('fs')

http.createServer((req, res) => {
  console.log(req.url)
  console.log(url.parse(req.url).query)
  console.log(req.headers.cookie)
  req.cokies = req.headers.cookie
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html;charset=UTF-8')
  res.setHeader('Set-Cookie', 'isVisit=1;path=/;Expires;HttpOnly;Domain=localhost')
  let rs = fs.createReadStream('./index.html')
  rs.pipe(res)
  // res.end('htht 你好')
}).listen('1337')

const cookisHandler = (req, res) => {
  if (!req.cookies.isVisit) {
    res.end('动物园')
  }
}