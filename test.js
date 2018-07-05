'use strict'

const test = require('tape')
const countries = require('iso-3166-1')
const validate = require('validate-fptf')
const moment = require('moment-timezone')
const uniqBy = require('lodash.uniqby')

const ecolines = require('.')

const timezones = moment.tz.names()

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

		t.ok(!!station.location.longitude)
		t.ok(timezones.includes(station.location.timezone))
	}

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

test('ecolines.stopovers', async (t) => {
	const berlin = '211'
	const date = moment.tz('Europe/Berlin').add(5, 'days').startOf('day').toDate()
	const stopovers = await ecolines.stopovers(berlin, {when: date})

	t.ok(stopovers.length > 4)
	for (let stopover of stopovers) {
		validate(stopover)
		t.ok(!!stopover.schedule)
		t.ok(!!stopover.line)
		t.ok(!!stopover.trip)

		if (stopover.arrival) {
			t.ok(+new Date(stopover.arrival) - +date > 0)
			t.ok(+new Date(stopover.arrival) - +date <= 24*60*60*1000)
		}

		if (stopover.departure) {
			t.ok(+new Date(stopover.departure) - +date > 0)
			t.ok(+new Date(stopover.departure) - +date <= 24*60*60*1000)
		}

		t.ok(stopover.origin)
		validate(stopover.origin)
		if (stopover.origin.id === berlin) t.ok(!stopover.arrival)
		else t.ok(stopover.arrival)

		t.ok(stopover.destination)
		validate(stopover.destination)
		if (stopover.destination.id === berlin) t.ok(!stopover.departure)
		else t.ok(stopover.departure)
	}

	const stopoversByTrip = uniqBy(stopovers, 'trip')
	t.ok(stopoversByTrip.length === stopovers.length)

	const stopoversFromRiga = stopovers.filter(s => s.origin.id === '1')
	t.ok(stopoversFromRiga.length >= 2)

	const stopoversToRiga = stopovers.filter(s => s.destination.id === '1')
	t.ok(stopoversToRiga.length >= 2)

	t.end()
})
