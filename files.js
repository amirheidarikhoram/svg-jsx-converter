/**
 * @typedef {{[key: string]: {svgSrc: string, shouldUpdate: boolean}}} SVGGroup
 * @typedef {import('./config').Config} Config
 */

const { getDestFileName } = require('./config');
const transform = require('./transform');

module.exports = {
    readSVGs(config) {
        const { src } = config
        const fs = require('fs');
        const path = require('path');
        const state = require('./tracking').getTrackingState(src);
        const svgFiles = fs.readdirSync(src).filter(file => path.extname(file) === '.svg');
        const svgs = {};
        svgFiles.forEach(file => {

            // check if file name is correct lower kebab case file name not starting with number and -
            const fileNameRegex = /^[a-z]+-?[0-9]*(-[a-z0-9]+)*.svg$/;

            if (!fileNameRegex.test(file)) {
                console.error(`Error: File name ${file} is not correct. File name should be in lower kebab case and not start with number or -`);
                process.exit(1);
            }

            const filePath = path.join(src, file);
            const fileStat = fs.statSync(filePath);
            const fileLastModified = fileStat.mtimeMs;
            const fileLastModifiedState = state[file] ? state[file].svgLastModified : 0;
            svgs[file] = {
                svgSrc: fs.readFileSync(filePath, 'utf8'),
                shouldUpdate: fileLastModified > fileLastModifiedState || !fs.existsSync(getDestFileName(file, config)),
            };
        });
        return svgs;
    },
    /**
     * @param {SVGGroup} svgs
     * @param {Config} config
     * */
    async generateXSXFiles(svgs, config) {

        const { src, dest, type, imports, memo, fcType } = config

        const fs = require('fs');
        const path = require('path');
        const state = require('./tracking').getTrackingState(src);
        const svgNames = Object.keys(svgs);

        const indexFileName = path.join(dest, `index.${type.replace('x', '')}`);
        let indexFileImports = ''
        let iconsObjectMembers = ''

        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }

        for (let i = 0; i < svgNames.length; i++) {

            if (!svgs[svgNames[i]].shouldUpdate) continue;

            const svgName = svgNames[i]
            const svg = svgs[svgName];
            const svgSrc = svg.svgSrc;
            const basename = path.basename(svgName, '.svg');
            const xsxFileName = svgName.replace('.svg', `.${type}`)
            const svgDest = path.join(dest, xsxFileName);
            const svgLastModified = fs.statSync(path.join(src, svgName)).mtimeMs;

            const fnName = svgName.replace('.svg', '').split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('')

            state[svgName] = state[svgName] ? { ...state[svgName], svgLastModified } : {
                svgLastModified
            };

            fs.writeFileSync(svgDest, await transform(svgSrc, {
                export: "named",
                fnName,
                imports,
                memo,
                fcType,
            }));

            indexFileImports += `import {${fnName}} from './${basename}';\n`
            iconsObjectMembers += `  ${fnName},\n`
        }

        require('./tracking').updateTrackingState(state, src);

        const indexContent = indexFileImports + `\nexport const ICONS = {\n${iconsObjectMembers}};`;
        fs.writeFileSync(indexFileName, indexContent);
    }
}