'use strict'

const got = require('got')

const routes = async () => {
	const res = await got('https://api.ecolines.net/v1/directions.json')
	return JSON.parse(res.body)
}

module.exports = routes
