'use strict'

const fs = require('fs')
const path = require('path')

const fetchRoutes = require('./fetch-routes')
const fetchCountries = require('./fetch-countries')

const showError = (err) => {
	console.error(err)
	process.exit(1)
}

const writeJSON = (file, data) =>
	new Promise((yay, nay) => {
		const dest = path.join(__dirname, '..', file)
		fs.writeFile(dest, JSON.stringify(data), (err) => {
			if (err) nay(err)
			else yay()
		})
	})

const stations = {}

fetchRoutes()
.then((connections) => {
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

	return fetchCountries()
})
.then((countries) => {
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
})
.then(() => writeJSON('stations.json', stations))
.catch(showError)
