const cache = module.exports = { }

const store = new Map()
cache._store = store
cache.cacheSize = 0
cache.cacheEntries = 0
cache.cacheCharacterLimit = 100 * 1024 * 1024 // Default max size stringified character limit

cache.info = () => {
  return {
    cacheEntries: cache.cacheEntries,
    cacheSize: cache.cacheSize,
    cacheCharacterLimit: cache.cacheCharacterLimit
  }
}

cache.set = (key, val, duration = null, cb = () => {}) => {
  // Do not allow the cache to exceed its specified maximum size
  if (cache.cacheSize + cache.calculateSize(val) > cache.cacheCharacterLimit) {
    return cb(new Error(`Max size exceeded: ${key} rejected, as adding this item will exceed the specified maximum cache character limit. You are currently using ${cache.cacheSize}/${cache.cacheCharacterLimit} characters`))
  }

  store.set(key, {
    data: val,
    ttl: duration === null ? null : setTimeout(() => {
      cache.del([key], () => { })
    }, duration)
  })

  cache.cacheEntries++
  cache.cacheSize += cache.calculateSize(val)

  cb(null, 'success')
}

cache.calculateSize = val => JSON.stringify(val).length

cache.del = (keys, cb = () => {}) => {
  if (typeof keys === 'string') keys = [keys]

  keys.forEach(key => {
    const data = store.get(key)
    if (!data) return cb(new Error(`No such key: ${key}`))
    clearTimeout(data.ttl)
    store.delete(key)
    cache.cacheEntries--
    cache.cacheSize -= cache.calculateSize(data.data)
  })
  cb(null, 'success')
}

cache.mget = (keys = [], cb) => {
  const values = keys.map(key => (store.get(key) || { }).data)
  return cb(null, values)
}

cache.getAll = cb => {
  cache.mget([...store.keys()], cb)
}

cache.getAllKeys = cb => cb(null, [...store.keys()])

cache.get = (key, cb) => cb(null, (store.get(key) || {}).data)

cache.setMaxSize = size => {
  if (!size || typeof size !== 'number') return
  cache.cacheCharacterLimit = size
}

cache.flush = cb => {
  cache.del([...store.keys()], cb)
}
