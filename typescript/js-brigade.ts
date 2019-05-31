/**
 * 安卓 和 web 交互的 方式
 */

interface Window {
  dkBridge: {
    takePhoto: () => void;
    takePhotoCb?: (json: {
      name: string,
      type: string,
    }) => void
  }
}
// 简易版
window.dkBridge.takePhoto()
window.dkBridge.takePhotoCb = json => {
  console.log(json)
}

// promise
const takePhoto = function() {
  return new Promise((resolve, reject) => {
    window.dkBridge.takePhoto()
    window.dkBridge.takePhotoCb = json => {
      resolve(json)
      if (!json) {
        reject('something wrong')
      }
    }
  })
}

// xstream 封装
// import xstream from 'xstream'
// const takePhotoCallBackProducer: Producer<{
//   imageType: string;
//   imageName: string;
//   ocrResult?: {
//     idNumber: string,
//     fullName: string,
//   }
// }> = {
//   start: listener => {
//     window.dkBridge.takePhotoCb = json => {
//       listener.next(json)
//     }
//   },
//   // tslint:disable-next-line:no-empty
//   stop: () => {},
// }

// export const takePhotoCbStream = xs.create(takePhotoCallBackProducer)
