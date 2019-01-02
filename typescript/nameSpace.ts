class Foo {
  alert() {
    console.log(this)
  }
}
interface Bar {
  k: string
}
type Bas = {}

// let foo: Foo = {
//   alert() {
//     console.log('k')
//   }
// };
let bar: Bar;

const someVar = Foo
const someOtherVar = 123