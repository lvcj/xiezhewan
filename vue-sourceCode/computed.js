// let person = {}

// let options = {
//     configurable: true,
//     enumerable: true,
//     writable: true
// }

// Object.defineProperty(person, 'age', {
//     // ...options,
//     // value: '22'
//     get() {
//         console.log('Getter age')
//         return 25
//     }
// })

//console.log('This age is', person.age)

function defineReactive(obj, key, val) {
    Object.defineProperty(obj, key, {
        configurable: true,
        enumerable: true,
        get() {
            return val
        },
        set(newValue) {
            val = newValue
        }
    })
}

let person = {}
let Dep = {} //依赖跟踪器


defineReactive(person, 'age', 25)
defineReactive(person, 'country', 'Brazil')

// if (person.age < 18) {
//     return 'minor'
// } else {
//     return 'adult'
// }

person.country = 'Russia'

function defineComputed (obj, key, computeFunc, updateCallback) {
    Object.defineProperty (obj, key, {
        get: function () {
            // call the compute function and return the value
            return computeFunc ();
        },
        set: function () {
            // don't do anything. can't set computed funcs
        }
    })
}

defineComputed (
    person, // the object to create computed property on
    'status', // the name of the computed property
    function () { // the function which actually computes the property
        console.log ("status getter called")
        if (person.age < 18) {
            console.log('minor')
        }
        else {
            console.log('adult')
        }
    },
    function (newValue) {
      // called when the computed value is updated
      console.log ("status has changed to", newValue)
    }
)

