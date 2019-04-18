type Mac = {
  cost: () => number;
}

function Macbook() {
  this.cost = function() {
    return 1000
  }
}

function Memory(macbook:Mac) {
  this.cost = function() {
    return macbook.cost() + 75
  }
}
