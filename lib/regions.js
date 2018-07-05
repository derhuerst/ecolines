'use strict'

const got = require('got')
const helpers = require('./helpers')
const _stations = require('./stations')

const createRegion = stations => city => {
	const r = ({
	    type: 'region',
		id: city.id + '',
		name: city.title,
        country: helpers.fixCountryCode(city.iso)
	})

    const regionStations = stations.filter(s => s.regions.includes(r.id))
    r.stations = regionStations.map(s => s.id)

    return r
}

const getCities = () =>
    got.get('https://api.ecolines.net/ema/v1/getCities', {json: true})
    .then(res => res.body)

const regions = async () => {
    const [stations, cities] = await Promise.all([_stations(), getCities()])
    const allRegions = cities.map(createRegion(stations))
	// filter all regions for stations that are currently filtered out in stations() because they are not operated yet
	return allRegions.filter(r => r.stations.length > 0)
}

module.exports = regions
