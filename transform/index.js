const clean = require('./cleaner');
const parse = require('./parser');
const transform = require('./transformer');
const stringify = require('./stringifier');
const format = require('./formatter');

/**
 * Clean-up and transform SVG into valid JSX.
 * @param {string} svg SVG string
 * @param {Object} config Output component type and Prettier options.
 * @returns {string}
 */
async function transformer(svg, config = {}) {
  const cleaned = await clean(svg, config);
  const parsed = parse(cleaned.data);
  const transformed = transform(parsed);
  const morphed = stringify(transformed);
  const formatted = format(morphed, config);

  return formatted;
}

module.exports = transformer;
