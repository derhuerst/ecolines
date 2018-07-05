# `stopovers(station, opt = {})`

Get a list of stopovers (departures / arrivals) at a given station (at a given date). Returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/promise) that will resolve in an array of `stopover`s in the [*Friendly Public Transport Format*](https://github.com/public-transport/friendly-public-transport-format).

```js
const ecolines = require('ecolines')

const berlin = '211'
const riga = {
    type: 'station',
    id: '1',
    // …
}

ecolines.stopovers(berlin)
.then(console.log)
.catch(console.error)

ecolines.stopovers(riga, {when: new Date()})
.then(console.log)
.catch(console.error)
```

- `station` can be both a station `id` and a station `object`.
- `defaults`, partially overwritten by `opt`, looks like this:

```js
{
    when: new Date() // results for the entire calendar day of `when` in the station's timezone will be returned
}
```

## Response

```js
[
    {
        type: "stopover",
        station: {
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
        line: "846009",
        schedule: "459240",
        trip: "3072",
        origin: {
            type: "station",
            id: "1",
            name: "Riga (bus station)"
        },
        destination: {
            type: "station",
            id: "211",
            name: "Berlin"
        },
        arrival: "2018-07-05T13:30:00+02:00",
        arrivalPlatform: null,
        departure: null
    },
    {
        type: "stopover",
        station: {
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
        line: "846407",
        schedule: "463555",
        trip: "3228",
        origin: {
            type: "station",
            id: "1",
            name: "Riga (bus station)"
        },
        destination: {
            type: "station",
            id: "43",
            name: "Bonn"
        },
        arrival: "2018-07-05T07:15:00+02:00",
        arrivalPlatform: null,
        departure: "2018-07-05T07:20:00+02:00",
        departurePlatform: null
    }
    // …
]
```
