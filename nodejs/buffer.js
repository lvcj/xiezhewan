// const str = '深入浅出nodejs'
// const buf = new Buffer(str, 'utf-8')
// console.log(buf)

const http = require('http')
let helloworld = ''

for (let i = 0; i < 1024 * 10; i++) {
  helloworld += 'a'
}
// helloworld = new Buffer(helloworld); 
http.createServer((req, res) => {
  res.statusCode = 200
  res.end(helloworld)
}).listen(8001)
