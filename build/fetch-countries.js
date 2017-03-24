'use strict'

const got = require('got')

const countries = () =>
	got('https://api.ecolines.net/v1/countries.json')
	.then((res) => JSON.parse(res.body))

module.exports = countries
