# `journeys(origin, destination, opt = {})`

Get a list of journeys between given origin and destination. Returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/promise) that will resolve in an array of `journey`s in the [*Friendly Public Transport Format*](https://github.com/public-transport/friendly-public-transport-format).

```js
const ecolines = require('ecolines')

const berlin = '211'
const riga = {
    type: 'station',
    id: '1',
    // …
}

ecolines.journeys(berlin, riga)
.then(console.log)
.catch(console.error)

ecolines.stopovers(riga, berlin, {when: new Date(), currency: 'PLN', adults: 3})
.then(console.log)
.catch(console.error)
```

- `origin` and `destination` can be both station `id`s and a station `object`s.
- `defaults`, partially overwritten by `opt`, looks like this:

```js
{
    when: new Date(), // results for the entire calendar day of `when` in the origin's timezone will be returned
    currency: 'EUR', // see the `currencies` method for available currency codes
    adults: 1,
    children: 0,
    teenagers: 0,
    seniors: 0
}
```

## Response

```js
[
    {
        type: "journey",
        id: "3436323634332d3436333539357c312d35312d323131",
        legs: [
            {
                id: "3436323634337c312d3531",
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
                        timezone: "Europe/Riga"
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
                        timezone: "Europe/Vilnius"
                    },
                    description: "Bus Station (Autobusų stotis) on 2 B Stoties str."
                },
                departure: "2018-07-05T12:30:00+03:00",
                arrival: "2018-07-05T17:50:00+03:00",
                mode: "bus",
                public: true,
                operator: "ecolines"
            },
            {
                id: "3436333539357c35312d323131",
                origin: {
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
                        timezone: "Europe/Vilnius"
                    },
                    description: "Bus Station (Autobusų stotis) on 2 B Stoties str."
                },
                destination: {
                    type: "station",
                    id: "211",
                    name: "Berlin",
                    regions: [
                        "211"
                    ],
                    location: {
                        type: "location",
                        country: "DE",
                        longitude: 13.280174732208252,
                        latitude: 52.50728190225904,
                        timezone: "Europe/Berlin"
                    },
                    description: "Bus Station (ZOB) \"Am Funkturm\" on Masurenallee"
                },
                departure: "2018-07-05T18:15:00+03:00",
                arrival: "2018-07-06T07:15:00+02:00",
                mode: "bus",
                public: true,
                operator: "ecolines"
            }
        ],
        price: {
            amount: 774,
            currency: "PLN"
        }
    },
    {
        type: "journey",
        id: "3436323530397c312d323131",
        legs: [
            {
                id: "3436323530397c312d323131",
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
                        timezone: "Europe/Riga"
                    },
                    description: "International Bus Station (Autoosta) on 1 Pragas str. (iela)"
                },
                destination: {
                    type: "station",
                    id: "211",
                    name: "Berlin",
                    regions: [
                        "211"
                    ],
                    location: {
                        type: "location",
                        country: "DE",
                        longitude: 13.280174732208252,
                        latitude: 52.50728190225904,
                        timezone: "Europe/Berlin"
                    },
                    description: "Bus Station (ZOB) \"Am Funkturm\" on Masurenallee"
                },
                departure: "2018-07-05T12:30:00+03:00",
                arrival: "2018-07-06T07:15:00+02:00",
                mode: "bus",
                public: true,
                operator: "ecolines"
            }
        ],
        price: {
            amount: 774,
            currency: "PLN"
        }
    }
    // …
]
```
