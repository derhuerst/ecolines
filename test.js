'use strict'

const test = require('tape')
const isRoughlyEqual = require('is-roughly-equal')

const stations = require('.')



test('stations.json – Berlin', (t) => {
	t.plan(8)
	const s = stations['211'] // Berlin ZOB

	t.equal(s.id, '211')
	t.equal(s.name, 'Berlin')
	t.ok(s.description)
	t.equal(s.country, 'DE')
	t.equal(typeof s.description, 'string')
	t.ok(s.coordinates)
	t.ok(isRoughlyEqual(.001, s.coordinates.latitude, 52.5073))
	t.ok(isRoughlyEqual(.001, s.coordinates.longitude, 13.2792))
})

test('stations.json – all', (t) => {
	for (let id in stations) {
		const s = stations[id]
		t.equal(s.id, id, id + ' has an invalid id')
		t.ok(s.name, id + ' has an invalid name')
		t.equal(typeof s.description, 'string', id + ' has an invalid description')
		t.equal(typeof s.country, 'string', id + ' has an invalid country')
		t.ok(s.coordinates, id + ' has invalid coordinates')
	}
	t.end()
})
