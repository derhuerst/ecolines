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
        id: "866",
        name: "Kremenchug",
        country: "UA",
        stations: [
            "866"
        ]
    },
    {
        type: "region",
        id: "1070",
        name: "Venlo",
        country: "NL",
        stations: [
            "1070"
        ]
    },
    {
        type: "region",
        id: "100",
        name: "Warszawa",
        country: "PL",
        stations: [
            "100",
            "948"
        ]
    },
    {
        type: "region",
        id: "7",
        name: "Kaunas",
        country: "LT",
        stations: [
            "7",
            "1090",
            "1039"
        ]
    }
    // …
]
```
