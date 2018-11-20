const isAndroid = () => {
  const ua = navigator.userAgent
  if (ua.includes('Android') || ua.includes('Adr')) return true
  return false
}

const isiOS = () => {
  const ua = navigator.userAgent
  if (ua.includes('iPhone') || ua.includes('Mac')) return true
  return false
}