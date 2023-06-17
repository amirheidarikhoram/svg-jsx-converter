/** @typedef {{[key: string]: {svgLastModified: number}}} SVGState */


module.exports = {
    /**
     * Updates the state file with the new tracking state.
     * @param {SVGState} state Source state
     * @param {string} src Source path
     * */
    updateTrackingState: function (state, src) {
        const fs = require('fs');
        const path = require('path');

        const statePath = path.join(src, '.state.json');

        if (!fs.existsSync(src)) {
            fs.mkdirSync(src, { recursive: true });
        }

        fs.writeFileSync(statePath, JSON.stringify(state, null, 4));
    },
    /** 
     * Tries to read the state file, if it doesn't exist, it creates it and returns an empty object.
     * @param {string} src Source path
     * @returns {SVGState} Source state
     * */
    getTrackingState: function (src) {
        const fs = require('fs');
        const path = require('path');

        const statePath = path.join(src, '.state.json');

        if (fs.existsSync(statePath)) {
            return JSON.parse(fs.readFileSync(statePath));
        } else {
            fs.mkdirSync(src, { recursive: true });
            fs.writeFileSync(statePath, JSON.stringify({}, null, 4));
            return {};
        }
    }
}