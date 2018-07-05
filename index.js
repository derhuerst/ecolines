'use strict'

const stations = require('./lib/stations')
const regions = require('./lib/regions')
const stopovers = require('./lib/stopovers')
const currencies = require('./lib/currencies').currencies

module.exports = {stations, regions, stopovers, currencies}
