export function setCookie(name, value, days = 7) {
  const d = new Date()
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000)
  const expires = `expires=${d.toUTCString()}`
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(
    value,
  )};${expires};path=/;SameSite=Lax`
}

export function getCookie(name) {
  const target = `${encodeURIComponent(name)}=`
  const parts = String(document.cookie || '').split(';')
  for (const p of parts) {
    const s = p.trim()
    if (s.startsWith(target)) return decodeURIComponent(s.slice(target.length))
  }
  return null
}

export function deleteCookie(name) {
  document.cookie = `${encodeURIComponent(
    name,
  )}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Lax`
}


