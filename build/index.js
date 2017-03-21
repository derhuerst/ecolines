'use strict'

const fs = require('fs')
const path = require('path')

const fetchRoutes = require('./fetch-routes')

const writeJSON = (file, data) =>
	new Promise((yay, nay) => {
		const dest = path.join(__dirname, '..', file)
		fs.writeFile(dest, JSON.stringify(data), (err) => {
			if (err) nay(err)
			else yay()
		})
	})

const stations = {}
const routes = []

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

	return writeJSON('stations.json', stations)
})
// .then(console.log)
