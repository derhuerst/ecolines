# `currencies()`

Get a list of supported [ISO-4217](https://en.wikipedia.org/wiki/ISO_4217) currency codes such as `EUR` or `PLN`. Returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/promise) that will resolve in an array of ISO-4217 currency codes.

```js
const ecolines = require('ecolines')

ecolines.currencies()
.then(console.log)
.catch(console.error)
```

## Response

```js
[
    "EUR",
    "BYN",
    "PLN",
    "RUB",
    "UAH"
]
```
