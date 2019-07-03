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
    const filePath = path.resolve(__dirname, './src/assets/image')
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
        if (file === 'assets') return
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

async function main(extension = 'svg') {
    const importsPath = path.resolve(__dirname, './src')
    let allIcons = await readIcon()

    readImports(importsPath, allIcons, (res) => {
        const filePath = path.resolve(__dirname, './src/assets/image')
        allIcons.forEach(item => {
            if (!item.isUsed) {
                exec(`rm ${path.join(filePath, `${item.name}.${extension}`)}`, (error, stdout, stderr) => {
                    if (error) {
                        console.log(error.stack)
                        console.log('Error code: ' + error.code)
                      }
                    console.log('Child Process STDOUT: ' + stdout)
                })
                exec(`rm ${path.join(filePath, `${item.name}.png`)}`, (error, stdout, stderr) => {
                    if (error) {
                        console.log(error.stack)
                        console.log('Error code: ' + error.code)
                      }
                    console.log('Child Process STDOUT: ' + stdout)
                })
            }
        })
    })
}

export default main
