let something

(function (something) {
  something.foo = 123
})(something || (something = {}))

//console.log(something)

namespace Utils {
  export function log (msg:any) {
    console.log(msg)
  }

  export function error (msg:any) {
    console.error(msg)
  }
}

Utils.log('call me')
Utils.error('maybe')
