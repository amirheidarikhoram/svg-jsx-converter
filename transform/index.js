/**
 * @typedef {import('./formatter').ReactifyConfig} ReactifyConfig
 */

const clean = require('./cleaner');
const parse = require('./parser');
const transform = require('./transformer');
const stringify = require('./stringifier');
const format = require('./formatter');

/**
 * Clean-up and transform SVG into valid JSX.
 * @param {string} svg SVG string
 * @param {ReactifyConfig} config Reactify config
 * @returns {string}
 */
async function transformer(svg, config = {}) {
  const cleaned = await clean(svg, {
    cleanupIDs: config.cleanupIDs,
  });
  const parsed = parse(cleaned.data);
  const transformed = transform(parsed);
  const morphed = stringify(transformed, true);
  const formatted = format(morphed, config);

  return formatted;
}

module.exports = transformer;
