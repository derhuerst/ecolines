'use strict'

const fs = require('fs')
const path = require('path')
const got = require('got')

const routes = () =>
	got('https://api.ecolines.net/v1/directions.json')
	.then((res) => JSON.parse(res.body))

module.exports = routes
