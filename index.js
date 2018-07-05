'use strict'

const stations = require('./lib/stations')
const regions = require('./lib/regions')
const stopovers = require('./lib/stopovers')
const currencies = require('./lib/currencies').currencies
const journeys = require('./lib/journeys')
const legDetails = require('./lib/legDetails')

module.exports = {stations, regions, stopovers, currencies, journeys, legDetails}
