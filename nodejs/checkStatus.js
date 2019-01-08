const fs = require('fs')
const path = require('path')
const exec = require('child_process').exec

// 判断文件类型
const _r = path => {
    return new Promise((resolve, reject) => {
        fs.stat(path, (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}
// 读文件夹
const _dir = path => {
    return new Promise((resolve, reject) => {
        fs.readdir(path, (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
  })
}

// 读取文件 buffer
const _rf = path => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}

// read iconname
async function readIcon() {
    const filePath = path.resolve(__dirname, './assets/image')
    let res = await _dir(filePath)
    
    return res.map(item => ({
        name: item.split('.')[0],
        isUsed: false,
    }))
}

// 计数器
let count = 0
let res = {}
// iconObj 直接传递引用，省事
async function readImports(filePath, icons, callBack) {

    const allFiles = await _dir(filePath)
    allFiles.forEach(async file => {
        const childPath = path.join(filePath, file)
        let resp = await _r(childPath)
        if (resp.isFile()) {
            count++
            let trueFile = await _rf(childPath)
            count--
            icons.forEach(icon => {
                if (trueFile.toString('UTF-8').includes(icon.name)) {
                    icon.isUsed = true
                    res[icon.name] = true
                }
            })
            if (count === 0 && callBack) {
                callBack(res)
            }
        } else if (resp.isDirectory()) {
            readImports(childPath, icons, callBack)
        }
    })
}

async function main() {
    const importsPath = path.resolve(__dirname, './views')
    let allIcons = await readIcon()
    readImports(importsPath, allIcons, (res) => {
        console.log(allIcons)
        console.log(res)
    })
}

main()
