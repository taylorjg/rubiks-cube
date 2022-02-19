import packageJson from '../package.json'

const pos = location.pathname.lastIndexOf('/')
const pathname = pos >= 0 ? location.pathname.substr(0, pos) : pathname
const base = location.origin + pathname

const CURRENT_CACHE_NAME = `cache-${packageJson.version}`

const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/styles.css',
  '/bundle.js',
  '/cube-bevelled.glb',
  '/manifest.json',
  '/icon.png'
]

self.addEventListener('install', async () => {
  const FN = '[service worker install]'
  console.log(FN, 'CURRENT_CACHE_NAME:', CURRENT_CACHE_NAME)
  const currentCache = await caches.open(CURRENT_CACHE_NAME)
  console.log(FN, 'currentCache:', currentCache)
  if (currentCache) {
    for (const url of URLS_TO_CACHE) {
      const fullUrl = base + url
      console.log(FN, 'currentCache.add:', fullUrl)
      await currentCache.add(fullUrl)
    }
  }
  self.skipWaiting()
})

self.addEventListener('activate', async () => {
  const FN = '[service worker activate]'
  console.log(FN)
  const keys = await caches.keys()
  console.log(FN, 'old caches:', JSON.stringify(keys))
  for (const key of keys) {
    if (key !== CURRENT_CACHE_NAME) {
      console.log(FN, 'deleting old cache:', key)
      await caches.delete(key)
    }
  }
})

self.addEventListener('fetch', async event => {
  const FN = '[service worker fetch]'
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        console.log(FN, 'event.request.url:', event.request.url, 'response:', response)
        return response ? response : fetch(event.request)
      })
  )
})
