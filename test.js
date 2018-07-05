'use strict'

const test = require('tape')
const countries = require('iso-3166-1')
const validate = require('validate-fptf')

const ecolines = require('.')

test('ecolines.stations', async (t) => {
	const stations = await ecolines.stations()

	t.ok(stations.length > 100)
	for (let station of stations) {
		validate(station)
		// regions
		t.ok(Array.isArray(station.regions))
		t.ok(station.regions.length > 0)
		// location & country
		validate(station.location)
		t.ok(countries.whereAlpha2(station.location.country))
	}

	const stationsWithGeolocation = stations.filter(s => !!s.location.longitude)
	t.ok(stationsWithGeolocation.length > 100)

	const stationsWithDescription = stations.filter(s => !!s.description)
	t.ok(stationsWithDescription.length > 20)

	t.end()
})

test('ecolines.regions', async (t) => {
	const regions = await ecolines.regions()

	t.ok(regions.length > 100)
	for (let region of regions) {
		validate(region)
		// stations
		t.ok(Array.isArray(region.stations))
		t.ok(region.stations.length > 0)
		// country
		t.ok(countries.whereAlpha2(region.country))
	}

	const regionsWithMultipleStations = regions.filter(r => r.stations.length > 0)
	t.ok(regionsWithMultipleStations.length > 1)

	t.end()
})
