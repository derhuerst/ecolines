'use strict'

const fixCountryCode = code => {
    // somehow Serbia got the code for former "Serbia and Montenegro", part of Yugoslavia… wat
    if (code === 'CS') return 'RS'
    return code
}

module.exports = {fixCountryCode}
