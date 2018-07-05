# ecolines

**JavaScript client for the [Ecolines](https://ecolines.net) API.** Complies with the [friendly public transport format](https://github.com/public-transport/friendly-public-transport-format). Inofficial, using endpoints by *Ecolines*. Ask them for permission before using this module in production.


[![npm version](https://img.shields.io/npm/v/ecolines.svg)](https://www.npmjs.com/package/ecolines)
[![build status](https://img.shields.io/travis/derhuerst/ecolines.svg)](https://travis-ci.org/derhuerst/ecolines)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/ecolines.svg)
[![chat on gitter](https://badges.gitter.im/public-transport.svg)](https://gitter.im/public-transport)

Things still missing:

- [routes](https://github.com/public-transport/friendly-public-transport-format/blob/master/docs/readme.md#route), [schedules](https://github.com/public-transport/friendly-public-transport-format/blob/master/docs/readme.md#schedule) from [this gist](https://gist.github.com/derhuerst/c76db8e9216b686b0262857cc9abd16e)
- stations by countries, from [here](https://ecolines.net/international/en/trip/bus-stops)

## Installing

```shell
npm install ecolines
```

## Usage

```js
const ecolines = require('ecolines')
```

This package contains data in the [*Friendly Public Transport Format*](https://github.com/public-transport/friendly-public-transport-format) and provides the following methods:

- [`stations()`](docs/stations.md) to get a list of operated stations, such as `Riga (bus station)`, `Berlin` or `Warsaw 01 (Zachodnia)`.
- [`regions()`](docs/regions.md) to get a list of all operated regions (cities) such as `Riga`, `Berlin` or `Warsaw`.
- [`stopovers(station, opt = {})`](docs/stopovers.md) to get a list of stopovers (departures / arrivals) at a given station (at a given date).

## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/derhuerst/ecolines/issues).
