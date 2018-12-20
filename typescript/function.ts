// 函数和泛型学习

function add(x: number, y: number):number {
  return x + y
}

let myAdd: (baseVal: number, increment:number) => number = function(x, y) { return x + y }

// generic 泛型
function identify<T>(arg: T[]): T[] {
  return arg
}
interface Args {
  [k:string]: any
}
let mIdentify: GenericIdentify<number> = identify

interface GenericIdentify<T> {
  (arg: T[]): T[]
}

interface Lengthwise {
  length: number;
}

function loggingIdentify<T extends Lengthwise>(arg: T): T {
  console.log(arg.length)
  return arg
}

loggingIdentify([3])

class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenerNum = new GenericNumber<number>()

myGenerNum.zeroValue = 1
myGenerNum.add = function(x, y) { return x + y }