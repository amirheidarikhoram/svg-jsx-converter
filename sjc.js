#!/usr/bin/env node

const args = require("args");
const path = require("path");

function main(path) {
    const config = require('./config').getConfig(path);
    const files = require('./files');
    files.generateXSXFiles(files.readSVGs(config), config)
}

args.option(
    "config",
    "Config file. If not present sjc will search for config file in $cwd."
)
    .command("init", "Generate a config file based in config option. If not present sjc will create config fie in $cwd.", (name, sub, options) => {
        const fs = require('fs');
        const constants = require('./constants');

        const configPath = path.join(options.config ? path.resolve(options.config) : process.cwd(), 'sjc.config.js');

        if (fs.existsSync(configPath)) {
            console.error("Error: sjc.config.js already exists")
            process.exit(1)
        }

        fs.writeFileSync(configPath, constants.DEFAULT_CONFIG_CONTENT);

        console.log('Created config.')
    })
    .command("gen", "Generate components.", (name, sub, options) => {
        main(options.config);

        console.log('Generated components.')
    });

args.parse(process.argv);

if (args.sub.length === 0) {
    args.showHelp();
    shell.exit(0);
}