'use strict'

const got = require('got')
const moment = require('moment-timezone')
const memoize = require('p-memoize')
const isString = require('lodash.isstring')
const isObject = require('lodash.isobject')
const isDate = require('lodash.isdate')
const sortBy = require('lodash.sortby')
const merge = require('lodash.merge')

const _stations = require('./stations')
const stations = memoize(_stations, {maxAge: 24*60*60*1000})
stations()

const findStationByName = (stations, name) => {
    const station = stations.find(s => s.name === name)
    if (!station) throw new Error('station not found: '+name)
    return station
}

const createStopover = stations => stopover => {
    const station = findStationByName(stations, stopover.stop)
    station.location.address = stopover.address

    const arrival = stopover.arrival ? moment.tz(stopover.arrival, 'YYYY-MM-DD HH:mm:ss', station.location.timezone).format() : null
    const departure = stopover.departure ? moment.tz(stopover.departure, 'YYYY-MM-DD HH:mm:ss', station.location.timezone).format() : null

    const platform = stopover.platform || null

    // todo: stopover.delay
    const s = ({
        type: 'stopover',
        stop: station,
        arrival,
        arrivalPlatform: platform,
        departure,
        departurePlatform: platform
    })

    return s
}

const createLeg = (stations, legId) => stopovers => {
    const l = ({
        id: legId,
        line: {
            type: 'line',
            id: stopovers[0].line+'',
            name: stopovers[0].linetitle,
            mode: 'bus',
            public: true,
            operator: 'ecolines'
        },
        origin: findStationByName(stations, stopovers[0].origin),
        destination: findStationByName(stations, stopovers[0].destination),
        busPhone: stopovers[0].busphone
    })

    stopovers = sortBy(stopovers, 'stopsequence')
    l.stopovers = stopovers.map(createStopover(stations))

    return l
}

const getLegDetails = (legId) =>
    got.get('https://api.ecolines.net/ema/v1/getSchedule', {
        json: true,
        query: {
            journey: legId
        }
    })
    .then(res => res.body)

const legDetails = async (legId) => {
    const stationList = await stations()

    if (!legId || !isString(legId)) throw new Error('invalid or missing legId')

    const result = await getLegDetails(legId)
    return createLeg(stationList, legId)(result)
}

module.exports = legDetails
