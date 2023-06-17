/** @typedef {{src: string, dest: string, type: 'tsx' | 'jsx'}} Config */

const path = require("path")

/**
 * @type {Partial<Config>}
 */
const DEFAULT_CONFIG = {
    type: "tsx"
}

module.exports = {
    /**
     * @returns {Config}
     * */
    getConfig() {
        let config = require(`${process.cwd()}/sjc.config.js`)
        config = { ...DEFAULT_CONFIG, ...config }

        if (!config.src || !config.dest) {
            console.error("Error: src and dest are required in config")
            process.exit(1)
        }

        return config
    },
    /**
     * 
     * @param {string} fileName 
     * @param {Config} config 
     */
    getDestFileName(fileName, config) {
        const confgi = path.join(config.dest, fileName.replace('.svg', `.${config.type}`));
    }
}