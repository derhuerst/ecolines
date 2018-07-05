'use strict'

const got = require('got')
const helpers = require('./helpers')

const createStation = country => station => {
	const s = ({
	    type: 'station',
		id: station.id + '',
		name: station.title,
        regions: [station.city+''],
		location: {
            type: 'location',
            country: helpers.fixCountryCode(country.iso)
        }
	})

    if (station.description) s.description = station.description
    if (station.location.longitude && station.location.latitude) {
        s.location.longitude = +station.location.longitude
        s.location.latitude = +station.location.latitude
    }

    return s
}

const getCountries = () =>
    got.get('https://api.ecolines.net/ema/v1/getCountries', {json: true})
    .then(res => res.body)

const stations = async () => {
    // old endpoint, seems outdated: https://api.ecolines.net/v1/countries.json

    const countries = await getCountries()

    const stationList = []
    for (let country of countries) {
        const countryStationList = country.stops.map(createStation(country))
        stationList.push(...countryStationList)
    }

    return stationList
}

module.exports = stations
