# `regions()`

Get all operated regions (cities) such as `Riga`, `Berlin` or `Warsaw`. Returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/promise) that will resolve in an array of `region`s in the [*Friendly Public Transport Format*](https://github.com/public-transport/friendly-public-transport-format).

```js
const ecolines = require('ecolines')

ecolines.regions()
.then(console.log)
.catch(console.error)
```

## Response

```js
[
    {
        type: "region",
        id: "1074",
        name: "Baunatal",
        country: "DE",
        stations: [
            "1074"
        ]
    },
    {
        type: "region",
        id: "681",
        name: "Tula",
        country: "RU",
        stations: [
            "681"
        ]
    },
    {
        type: "region",
        id: "100",
        name: "Warszawa",
        country: "PL",
        stations: [
            "973",
            "100",
            "948",
            "102"
        ]
    }
    // …
]
```
