const url = " http://httpbin.org/delay/3"
const urls: string[] = Array(10).fill(url)

function fetchUrls(urls: string[], max: number) {
  let key = max
  const urlsMap = urls.map((url, index) => ({
    async start() {
      const url = this.url
      await fetch(url, {
        method: 'GET',
      })
      this.done = true
      const cb = () => {
        urlsMap[key] && urlsMap[key].start()
        key++
      }
      cb()
    },
    done: false,
    url,
    index,
  }))

  const run = () => {
    Promise.all(urlsMap.slice(0, max).map(u => u.start()))
  }

  run()
}

fetchUrls(urls, 4)
