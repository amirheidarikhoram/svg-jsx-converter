/** @typedef {{src: string, dest: string, type: 'tsx' | 'jsx', imports: string[], fcType?: string, memo: boolean}} Config */

const path = require("path")

/**
 * @type {Partial<Config>}
 */
const DEFAULT_CONFIG = {
    type: "tsx",
    imports: [],
    memo: false,
    fcType: undefined,
}

module.exports = {
    /**
     * @returns {Config}
     * */
    getConfig() {

        const configPath = path.join(process.cwd(), 'sjc.config.js')

        if (!require.resolve(configPath)) {
            console.error("Error: sjc.config.js not found")
            process.exit(1)
        }

        let config = require(configPath)
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