'use strict'

const timezonesByCountry = require('country-tz').getTimeZonesByCode
const moment = require('moment-timezone')
const timespace = require('@mapbox/timespace')

const fixCountryCode = code => {
    // somehow Serbia got the code for former "Serbia and Montenegro", part of Yugoslavia… wat
    if (code === 'CS') return 'RS'
    return code
}

const findTimezone = (location) => {
    // return timezone for countries that have exactly one time zone
    const guessByCountry = timezonesByCountry(location.country)
    if (guessByCountry.length === 1) return guessByCountry[0]

    const coordinates = [location.longitude, location.latitude]
    const dateInTimezone = timespace.getFuzzyLocalTimeFromPoint(+new Date(), coordinates)
    return moment(dateInTimezone).tz()
}

module.exports = {fixCountryCode, findTimezone}
