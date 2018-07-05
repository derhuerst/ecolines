'use strict'

const got = require('got')

const createCurrency = c => ({
	id: c.id+'',
	code: c.iso
})

const getCurrencies = () =>
	got.get('https://api.ecolines.net/ema/v1/getCurrencies', {json: true})
	.then(res => res.body)

const currenciesWithIds = async () => {
    const currencies = await getCurrencies()
	return currencies.filter(x => +x.id >= 0).map(createCurrency)
}

const currencies = async () => {
	const cs = await currenciesWithIds()
	return cs.map(c => c.code)
}

module.exports = {currencies, currenciesWithIds}
