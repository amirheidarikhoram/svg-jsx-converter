/**
 * @typedef {import('./constants').Config} Config
 */

const fs = require("fs")
const path = require("path")
const constants = require('./constants')

module.exports = {
    /**
     * @returns {Config}
     * */
    getConfig(argsPath) {

        const configPath = argsPath ? path.resolve(argsPath) : path.join(process.cwd(), 'sjc.config.cjs')

        if (!fs.existsSync(configPath)) {
            console.error("Error: sjc.config.cjs not found")
            process.exit(1)
        }

        let config = require(configPath)
        config = { ...constants.DEFAULT_CONFIG, ...config }

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
        const configPath = path.join(config.dest, fileName.replace('.svg', `.${config.type}`));

        return configPath
    }
}