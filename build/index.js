'use strict'

const {writeFile} = require('fs/promises')
const path = require('path')

const fetchRoutes = require('./fetch-routes')
const fetchCountries = require('./fetch-countries')

const writeJSON = async (file, data) => {
	await writeFile(
		path.join(__dirname, '..', file),
		JSON.stringify(data),
	)
}

const stations = {}

;(async () => {
	const connections = await fetchRoutes()
	for (let c of connections) {
		for (let s of [c.origin, c.destination]) {
			if (!stations[s.id]) stations[s.id] = {
				id: s.id,
				name: s.title,
				description: s.description || '',
				coordinates: {
					latitude: parseFloat(s.location.latitude),
					longitude: parseFloat(s.location.longitude)
				}
			}
		}
	}

	const countries = await fetchCountries()
	for (let country of countries) {
		if (!country.iso) {
			console.error(country.title + ` doesn't have an ISO code`)
			continue
		}

		for (let station of country.stop) {
			if (!stations[station.id]) {
				console.error(`station ${station.id} does not exist`)
				continue
			}

			stations[station.id].country = country.iso
		}
	}

	await writeJSON('stations.json', stations)
})()
.catch((err) => {
	console.error(err)
	process.exit(1)
})
