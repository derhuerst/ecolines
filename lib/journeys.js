'use strict'

const got = require('got')
const moment = require('moment-timezone')
const memoize = require('p-memoize')
const isString = require('lodash.isstring')
const isObject = require('lodash.isobject')
const isDate = require('lodash.isdate')
const groupBy = require('lodash.groupby')
const merge = require('lodash.merge')

const _stations = require('./stations')
const _currencies = require('./currencies').currenciesWithIds

const stations = memoize(_stations, {maxAge: 24*60*60*1000})
stations()

const currencies = memoize(_currencies, {maxAge: 24*60*60*1000})
currencies()

const defaults = () => ({
    when: new Date(),
    currency: 'EUR',
    adults: 1,
    children: 0,
    teenagers: 0,
    seniors: 0
})

const createLeg = stations => leg => {
    const origin = stations.find(s => s.id === leg.origin.id+'')
    const destination = stations.find(s => s.id === leg.destination.id+'')

    const departure = moment.tz(leg.departure, 'YYYY-MM-DD HH:mm', origin.location.timezone).format()
    const arrival = moment.tz(leg.arrival, 'YYYY-MM-DD HH:mm', destination.location.timezone).format()

    const l = ({
        id: leg.id,
        origin,
        destination,
        departure,
        arrival,
        mode: 'bus',
        public: true,
        operator: 'ecolines'
    })

    return l
}

const createJourney = stations => journey => {
    const j = ({
        type: 'journey',
        id: journey.id,
        legs: journey.legs.map(createLeg(stations))
    })

    if (journey.price) j.price = ({
        amount: journey.price.amount / 100,
        currency: journey.price.currency.code
    })

    return j
}

// todo: see also /ema/v1/getFares?currency=11&journey=3436303035327c3231312d383735 for fares (has more detailed info)
const journeys = async (origin, destination, opt = {}) => {
    const [stationList, currencyList] = await Promise.all([stations(), currencies()])

    const options = merge({}, defaults(), opt)

    if (isString(origin)) origin = {id: origin, type: 'station'}
    if (!isString(origin.id)) throw new Error('invalid or missing origin id')
    if (origin.type !== 'station') throw new Error('invalid or missing origin type')
    origin = stationList.find(s => s.id === origin.id)
    if (!origin) throw new Error('unknown origin')

    if (isString(destination)) destination = {id: destination, type: 'station'}
    if (!isString(destination.id)) throw new Error('invalid or missing destination id')
    if (destination.type !== 'station') throw new Error('invalid or missing destination type')
    destination = stationList.find(s => s.id === destination.id)
    if (!destination) throw new Error('unknown destination')

    if (!isDate(options.when)) throw new Error('`opt.when` must be a JS Date() object')
    const day = moment.tz(options.when, origin.location.timezone).format('YYYY-MM-DD')

    if (!Number.isInteger(options.adults) || options.adults < 0) throw new Error('`opt.adults` must be a non-negative integer')
    if (!Number.isInteger(options.children) || options.children < 0) throw new Error('`opt.children` must be a non-negative integer')
    if (!Number.isInteger(options.teenagers) || options.teenagers < 0) throw new Error('`opt.teenagers` must be a non-negative integer')
    if (!Number.isInteger(options.seniors) || options.seniors < 0) throw new Error('`opt.seniors` must be a non-negative integer')

    if (!isString(options.currency)) throw new Error('`opt.currency` must be an ISO-4217 currency code string')
    const currency = currencyList.find(c => c.code.toLowerCase() === options.currency.toLowerCase())
    if (!currency) throw new Error('given `opt.currency` not supported: '+options.currency+', use the `currencies` method for a list of available currencies')

    const journeyList = await (got.get('https://api.ecolines.net/ema/v1/searchJourneys', {
        json: true,
        query: {
            origin: origin.id,
            destination: destination.id,
            date: day,
            currency: currency.id,
            adults: options.adults,
            children: options.children,
            teens: options.teenagers,
            seniors: options.seniors
        }
    })
    .then(res => res.body))

    return journeyList.map(createJourney(stationList))
}

module.exports = journeys
