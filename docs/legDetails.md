# `legDetails(legId)`

Get details (such as stopovers) for a given journey leg discovered using the [`journeys`](docs/journeys.md) method. Returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/promise) that will resolve in a `journey leg`s in the [*Friendly Public Transport Format*](https://github.com/public-transport/friendly-public-transport-format).

```js
const ecolines = require('ecolines')

const riga = '1'
const berlin = '211'

const journeys = await ecolines.journeys(riga, berlin) // note that this code won't work unless you wrap it in an async function. using await here just makes the example easier to read/understand
const firstLeg = journeys[0].legs[0]

ecolines.legDetails(firstLeg.id)
.then(console.log)
.catch(console.error)
```

## Response

```js
{
    id: "3435383837327c312d3531",
    line: {
        type: "line",
        id: "848003",
        name: "Riga (bus station)-Prague",
        mode: "bus",
        public: true,
        operator: "ecolines"
    },
    origin: {
        type: "station",
        id: "1",
        name: "Riga (bus station)",
        regions: [
            "1"
        ],
        location: {
            type: "location",
            country: "LV",
            longitude: 24.113842248916626,
            latitude: 56.944927364968635,
            timezone: "Europe/Riga",
            address: "International Bus Station (Autoosta) on 1 Pragas str. (iela)"
        },
        description: "International Bus Station (Autoosta) on 1 Pragas str. (iela)"
    },
    destination: {
        type: "station",
        id: "51",
        name: "Marijampole",
        regions: [
            "51"
        ],
        location: {
            type: "location",
            country: "LT",
            longitude: 23.364046812057495,
            latitude: 54.55694601215633,
            timezone: "Europe/Vilnius",
            address: "Bus Station (Autobusų stotis) on 2 B Stoties str."
        },
        description: "Bus Station (Autobusų stotis) on 2 B Stoties str."
    },
    busPhone: "+371 23302057",
    stopovers: [
        {
            type: "stopover",
            stop: {
                type: "station",
                id: "1",
                name: "Riga (bus station)",
                regions: [
                    "1"
                ],
                location: {
                    type: "location",
                    country: "LV",
                    longitude: 24.113842248916626,
                    latitude: 56.944927364968635,
                    timezone: "Europe/Riga",
                    address: "International Bus Station (Autoosta) on 1 Pragas str. (iela)"
                },
                description: "International Bus Station (Autoosta) on 1 Pragas str. (iela)"
            },
            arrival: null,
            arrivalPlatform: "1",
            departure: "2018-07-10T12:30:00+03:00",
            departurePlatform: "1"
        },
        // …
        {
            type: "stopover",
            stop: {
                type: "station",
                id: "7",
                name: "Kaunas",
                regions: [
                    "7"
                ],
                location: {
                    type: "location",
                    country: "LT",
                    longitude: 23.928000999999995,
                    latitude: 54.889013,
                    timezone: "Europe/Vilnius",
                    address: "Bus Station (Autobusų stotis) on 24 Vytauto avenue"
                },
                description: "Bus Station (Autobusų stotis) on 24 Vytauto avenue"
            },
            arrival: "2018-07-10T16:40:00+03:00",
            arrivalPlatform: null,
            departure: "2018-07-10T16:50:00+03:00",
            departurePlatform: null
        },
        {
            type: "stopover",
            stop: {
                type: "station",
                id: "51",
                name: "Marijampole",
                regions: [
                    "51"
                ],
                location: {
                    type: "location",
                    country: "LT",
                    longitude: 23.364046812057495,
                    latitude: 54.55694601215633,
                    timezone: "Europe/Vilnius",
                    address: "Bus Station (Autobusų stotis) on 2 B Stoties str."
                },
                description: "Bus Station (Autobusų stotis) on 2 B Stoties str."
            },
            arrival: "2018-07-10T17:50:00+03:00",
            arrivalPlatform: null,
            departure: null,
            departurePlatform: null
        }
    ]
}
```
