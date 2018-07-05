'use strict'

const got = require('got')
const moment = require('moment-timezone')
const memoize = require('p-memoize')
const isString = require('lodash.isstring')
const isDate = require('lodash.isdate')
const groupBy = require('lodash.groupby')
const merge = require('lodash.merge')

const _stations = require('./stations')
const stations = memoize(_stations, {maxAge: 24*60*60*1000})
stations()

const defaults = () => ({
    when: new Date()
})

const getKeyFromBoth = (obj1, obj2, key) => {
    let result
    if (obj1) result = obj1[key]
    if (obj2) result = obj2[key]
    if (!result) throw new Error('unexpected result from server, please report this issue')
    if (obj1 && obj1[key] !== result) throw new Error('unexpected result from server, please report this issue')
    return result+''
}

const createStopover = (station, day) => arrivalDepartureTuple => {
    if (arrivalDepartureTuple.length > 2 || arrivalDepartureTuple.length === 0) throw new Error('unexpected result from server, please report this issue')
    const arrival = arrivalDepartureTuple.find(t => t.direction === 'ARR')
    const departure = arrivalDepartureTuple.find(t => t.direction === 'DEP')

    const schedule = getKeyFromBoth(arrival, departure, 'sched_id')
    const line = getKeyFromBoth(arrival, departure, 'line')
    const trip = getKeyFromBoth(arrival, departure, 'service_id')

    const originId = getKeyFromBoth(arrival, departure, 'city_from_id')
    const originName = getKeyFromBoth(arrival, departure, 'city_from')
    const destinationId = getKeyFromBoth(arrival, departure, 'city_to_id')
    const destinationName = getKeyFromBoth(arrival, departure, 'city_to')

    const s = ({
        type: 'stopover',
        station,
        line,
        schedule,
        trip,
        origin: {
            type: 'station',
            id: originId,
            name: originName
        },
        destination: {
            type: 'station',
            id: destinationId,
            name: destinationName
        }
    })

    if (arrival) {
        // todo: arrival_sched_time…, arrival_real_time…, etc.
        const arrivalDate = moment.tz(`${day}_${arrival.sched_time}`, 'YYYY-MM-DD_HH:mm', station.location.timezone)
        s.arrival = arrivalDate.format()

        s.arrivalPlatform = arrival.platform || null
    } else {
        s.arrival = null
    }

    if (departure) {
        // todo: arrival_sched_time…, arrival_real_time…, etc. [sic!]
        const departureDate = moment.tz(`${day}_${departure.sched_time}`, 'YYYY-MM-DD_HH:mm', station.location.timezone)
        s.departure = departureDate.format()

        s.departurePlatform = departure.platform || null
    } else {
        s.departure = null
    }

    return s
}

// actually fetches both departures and arrivals, even though the URL says otherwise
const getStopovers = (stationId, day) =>
    got.get('https://api.ecolines.net/v1/arrivals.json.php', {
        json: true,
        query: {
            stop: stationId,
            date: day
        }
    })
    .then(res => res.body)

const stopovers = async (station, opt = {}) => {
    const stationList = await stations()

    const options = merge({}, defaults(), opt)

    if (isString(station)) station = {id: station, type: 'station'}
    if (!isString(station.id)) throw new Error('invalid or missing station id')
    if (station.type !== 'station') throw new Error('invalid or missing station type')
    station = stationList.find(s => s.id === station.id)
    if (!station) throw new Error('unknown station')

    if (!isDate(options.when)) throw new Error('`opt.when` must be a JS Date() object')
    const day = moment.tz(options.when, station.location.timezone).format('YYYY-MM-DD')

    const results = await getStopovers(station.id, day)
    const arrivalDepartureTuples = Object.values(groupBy(results, 'service_id'))

    return arrivalDepartureTuples.map(createStopover(station, day))
}

module.exports = stopovers
