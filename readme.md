# ecolines

**JavaScript client for the Ecolines API.**

[![npm version](https://img.shields.io/npm/v/ecolines.svg)](https://www.npmjs.com/package/ecolines)
[![build status](https://img.shields.io/travis/derhuerst/ecolines.svg)](https://travis-ci.org/derhuerst/ecolines)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/ecolines.svg)
[![chat on gitter](https://badges.gitter.im/derhuerst.svg)](https://gitter.im/derhuerst)

Things still missing:

- [routes](https://github.com/public-transport/friendly-public-transport-format/blob/master/docs/readme.md#route), [schedules](https://github.com/public-transport/friendly-public-transport-format/blob/master/docs/readme.md#schedule) from [this gist](https://gist.github.com/derhuerst/c76db8e9216b686b0262857cc9abd16e)
- stations by countries, from [here](https://ecolines.net/international/en/trip/bus-stops)


## Installing

```shell
npm install ecolines
```


## Usage

The [npm package](https://npmjs.com/ecolines) contains data in the [*Friendly Public Transport Format*](https://github.com/public-transport/friendly-public-transport-format).

```js
const stations = require('ecolines')

console.log(stations['211'])
```

```js
{
	id: '211',
	name: 'Berlin',
	description: 'ZOB "Am Funkturm", Masurenallee',
	country: 'DE', // ISO 3166-1 alpha-2
	coordinates: {
		latitude: 52.50728190225904,
		longitude: 13.280174732208252
	}
}
```


## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/derhuerst/ecolines/issues).
