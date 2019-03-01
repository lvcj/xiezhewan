const obj = new Proxy({}, {
  get: function (target, key, receiver) {
    console.log(`getting ${key}!`);
    return Reflect.get(target, key, receiver);
  },
  set: function (target, key, value, receiver) {
    console.log(`setting ${key}!`);
    return Reflect.set(target, key, value, receiver);
  }
});

console.log(obj)

var proxy = new Proxy({}, {
  get: function(target, property) {
    return 35;
  }
});

const handler = {
  get(target, name) {
    if (name === 'prototype') {
      return Object.prototype;
    }
    return 'hello, ' + name;
  },
  apply(target, thisBinding, args) {
    return args[0]
  },
  constructor(target, args) {
    return {
      value: args[1]
    }
  }
}

var fproxy = new Proxy(function(x,y) {
  return x + y
}, handler)

fproxy(1, 2)
new fproxy(1, 2)

/**
 * 
 */