# Remember Me

## About
A simple in-memory caching solution with ttl expiry, and limit support! Each valued stored into the cache has its size calculated by `JSON.stringify(data).length`, the default character limit is 100 * 1024 * 1024 (or 104,857,600 characters).  This can also be be adjusted if needed as explained in the notes below.  The cache will reject the newest item you are trying to store, if the size of that item will make the total size exceed the limit.

## Usage
In order to utilise this module you must first require it in your project like so:
`const cache = require('remember-me')`

### Store item
To store an item in the cache you must invoke cache.set, this accepts 4 parameters.  The first is the key which must be provided in string format, the second is the data you wish to store which can be provided in any format, the third is an optional integer which is milliseconds until expiry, and the fourth is an optional callback which includes error information, or a success message. The below example, shows how you would store an object into the cache.
`cache.set('your-key', {someValue: true, someOtherValue: false})`

This example will set some cache that will automatically delete itself after 10 seconds, and includes a callback
`cache.set('your-key', {someValue: true, someOtherValue: false}, 10000, (err, message) => { console.log(message) })`

### Get item
In order to fetch previously stored items from the cache you must invoke the cache.get function.  This function accepts 2 parameters, the first is the key you want to fetch which must be provided as a string. The second is a callback which is required, please see the below example:
`cache.get('your-key', (err, data) => { console.log(data) })`

### Get multiple items, callback data is return as an array of data
`cache.mget(['key-one', 'key-two', 'key-three'], (err, data) => { console.log(data) })`

### Get all item data, callback data is return as an array of data
`cache.getAll((err, data) => { console.log(data) })`

### Get all item keys, callback data is return as an array of strings
`cache.getAllKeys((err, data) => { console.log(data) })`

### Delete item
To delete cached items you must invoke the cache.del function.  It accepts 2 parameters, the first is the key you wish to delete, and the second is an optional callback function.
`cache.del('your-key')`

### Utility functions
cache.info - This will return an object with information about the currently stored cache such as: amount of cached items, the total size of the cache, and the allowed cache size limit.
cache.setMaxSize - With this function it is possible to increase the character limit of the cache.
