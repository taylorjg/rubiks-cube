const CURRENT_CACHE_VERSION = 4
const CURRENT_CACHE_NAME = `cache-v${CURRENT_CACHE_VERSION}`
const URLS_TO_CACHE = [
  '/',
  '/styles.css',
  '/bundle.js',
  '/cube-bevelled.glb'
]

self.addEventListener('install', async () => {
  console.log('[service worker install]')
  const cache = await caches.open(CURRENT_CACHE_NAME)
  cache.addAll(URLS_TO_CACHE)
})

self.addEventListener('activate', async () => {
  console.log('[service worker activate]')
  const keys = await caches.keys()
  console.log(`[service worker activate] old caches: ${JSON.stringify(keys)}`)
  const promises = keys.map(key => {
    if (key != CURRENT_CACHE_NAME) {
      console.log(`[service worker activate] deleting old cache ${key}`)
      return caches.delete(key)
    }
  })
  return Promise.all(promises)
})

self.addEventListener('fetch', event =>
  event.respondWith(
    caches.match(event.request)
      .then(response => response ? response : fetch(event.request))))
