const fs = require('fs')
const path = require('path')

const _r = path => {
  return new Promise((resolve, reject) => {
      fs.stat(path, (err, data) => {
          if (err) reject(err)
          resolve(data)
      })
  })
}
const _dir = path => {
  return new Promise((resolve, reject) => {
      fs.readdir(path, (err, data) => {
          if (err) reject(err)
          resolve(data)
      })
  })
}

const filePath = path.resolve(__dirname, './assets/image')

_dir(filePath).then(data => {
  let res = data.map(item => item.split('.')[0])
  console.log(res)
})
