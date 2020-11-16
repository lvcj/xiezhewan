const middlewares = [
  async (ctx, next) => { 
    console.log('m1 before'); 
    await next(); 
    console.log('m1 after');
  },
  async (ctx, next) => { 
    console.log('m2 before'); 
    await next(); 
    console.log('m2 after');
  },
  async (ctx, next) => { 
    console.log('m3 before'); 
    await next(); 
    console.log('m3 after');
  },
]

async function processMiddleware(mids) {
  mids.reduce(async (a, b) => {
    let i = () => a(undefined, b)
    return i
  })
}

middlewares.reduceRight(
  (a, b) => () => Promise.resolve(b(a)),
  () => Promise.resolve()
)()