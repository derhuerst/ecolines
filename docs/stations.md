# `stations()`

Get all operated stations as `Riga (bus station)`, `Berlin` or `Warsaw 01 (Zachodnia)`. Returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/promise) that will resolve in an array of `station`s in the [*Friendly Public Transport Format*](https://github.com/public-transport/friendly-public-transport-format).

```js
const ecolines = require('ecolines')

ecolines.stations()
.then(console.log)
.catch(console.error)
```

## Response

```js
[
    {
        type: "station",
        id: "569",
        name: "Vienna",
        regions: [
            "569"
        ],
        location: {
            type: "location",
            country: "AT",
            longitude: 16.422189474105835,
            latitude: 48.21078998674276
        },
        description: "Stadion Center (Busterminal), Olimpiaplatz 2 (Engerthstr.) "
    },
    {
        type: "station",
        id: "975",
        name: "Walbrzych",
        regions: [
            "975"
        ],
        location: {
            type: "location",
            country: "AT"
        }
    },
    {
        type: "station",
        id: "100",
        name: "Warsaw 01 (Zachodnia)",
        regions: [
            "100"
        ],
        location: {
            type: "location",
            country: "PL",
            longitude: 20.963255167007446,
            latitude: 52.21792110715475
        },
        description: "Bus Station (Dworzec PKS) \"Zachodnia\", 144 Al. Jerozolimskie str., platform 11 "
    },
    {
        type: "station",
        id: "948",
        name: "Warsaw 02 (Centralna)",
        regions: [
            "100"
        ],
        location: {
            type: "location",
            country: "PL",
            longitude: 21.00133180618286,
            latitude: 52.2293010190079
        },
        description: "Central Rail Station (Dworzec Centralny 04) on Al. Jana Pawla II str."
    },
    {
        type: "station",
        id: "102",
        name: "Warsaw (stad)",
        regions: [
            "100"
        ],
        location: {
            type: "location",
            country: "PL"
        }
    }
    // …
]
```
