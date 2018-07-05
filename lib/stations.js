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
		s.location.timezone = helpers.findTimezone(s.location)
    }

    return s
}

const getCountries = () =>
    got.get('https://api.ecolines.net/ema/v1/getCountries', {json: true})
    .then(res => res.body)

// only used because the "new" endpoint contains some stations that are not operated yet. the old endpoint is only used to filter for operated stations
const getCountriesOld = () =>
	got.get('https://api.ecolines.net/v1/countries.json')
	.then(res => JSON.parse(res.body))

const stations = async () => {
    const [countries, countriesOld] = await Promise.all([getCountries(), getCountriesOld()])

	const oldStations = [].concat(...countriesOld.map(x => x.stop))
	const oldStationIds = oldStations.map(s => s.id+'')

    const stationList = []
    for (let country of countries) {
        const countryStationList = country.stops.map(createStation(country))
        stationList.push(...countryStationList)
    }

    return stationList.filter(s => oldStationIds.includes(s.id))
}

module.exports = stations
