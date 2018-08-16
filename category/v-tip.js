export default {
  inserted(el, binding) {
    if (window.localStorage.getItem('kp-meTips')) return
    // clone node
    const HEIGHT = document.documentElement.clientHeight
    const rect = el.getBoundingClientRect()
    const faker = el.cloneNode(true)
    faker.style.marginTop = `${rect.top}px`
    faker.setAttribute('style',
      `position: absolute;
      top: ${rect.top}px;
      width: 100%;
      border: 1px solid #F99E22;
      box-shadow: 0 0 2px 0 #F99E22, 0 0 4px 0 #F8E71C;
      border-radius: 4px;
      transform: scale(.97);
      `)
    // add mask
    const mask = document.createElement('div')
    mask.classList.add('tip-mask')
    // add text
    const textContainer = document.createElement('div')
    textContainer.innerText = binding.value
    textContainer.classList.add('tip-text')
    textContainer.setAttribute('style', `bottom: ${HEIGHT - rect.top}px;`)
    // add maskarrow
    const arrow = document.createElement('div')
    arrow.classList.add('tip-arrow')

    textContainer.appendChild(arrow)
    mask.appendChild(textContainer)
    mask.appendChild(faker)
    // add removehandler
    mask.addEventListener('click', function() {
      const parent = mask.parentNode
      parent.removeChild(this)
    })
    document.body.appendChild(mask)
    // 默认只提示一次
    window.localStorage.setItem('kp-meTips', '1')
  },
}
