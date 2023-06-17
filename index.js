const config = require('./config').getConfig();
const files = require('./files');

files.generateXSXFiles(files.readSVGs(config), config)
