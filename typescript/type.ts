const num: number = 123

function indentity <T>(num: T): T {
  return num
}

function log (message: string): void {
  console.log(message)
}

function reverse<t> (items: t[]): t[] {
  const toreturn = []
  for (let i = items.length; i >= 0; i--) {
    toreturn.push(items[i])
  }
  return toreturn
}

const sample = [1, 2, 3]
const reversed = reverse(sample)
console.log(reversed)

let nameNumber: [string, number]

nameNumber = ['Jack', 23123]

export let [name, age] = nameNumber