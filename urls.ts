const url = " http://httpbin.org/delay/3"
const urls: string[] = Array(10).fill(url)

function fetchUrls(urls: string[], max: number) {
  const finished = []
  const urlsMap = urls.map((url, index) => ({
    async start() {
      const url = this.url
      await fetch(url, {
        method: 'GET',
      })
      this.done = true
      finished.push(this)
      window.postMessage({}, '/')
    },
    done: false,
    url,
    index,
  }))

  window.addEventListener('message', data => {
    const nextIndex = finished.length + max - 1
    urlsMap[nextIndex] && urlsMap[nextIndex].start()
  })

  const run = () => {
    Promise.all(urlsMap.slice(0, max).map(u => u.start()))
  }

  run()
}

fetchUrls(urls, 4)
