/**
 * @typedef {{
 *  imports: string[],
 *  export: "default" | "named",
 *  fnName: string
 *  fcType?: string,
 *  memo: boolean
 * }} ReactifyConfig
 */

const prettier = require('prettier');
const template = require('lodash.template');

/**
 * Creates React component.
 * @param {string} svg Transformed SVG string.
 * @param {ReactifyConfig} config
 * @return {string}
 */
function reactify(svg, config) {
  const data = {
    imports: [config.imports, config.memo ? `import {memo} from 'react'` : undefined].filter(i => i).join('\n'),
    parentComponent: config.memo ? `React.PureComponent` : `React.Component`,
    fnName: config.fnName,
    fcType: config.fcType ? `:${config.fcType}` : '',
    memoized: config.memo ? `const Memoized${config.fnName} = memo(${config.fnName})` : ``,
    exportComponent: config.memo ? `Memoized${config.fnName} as ${config.fnName}` : config.fnName,
  };

  const TEMPLATE = `
  <%= imports %>
  
  const <%= fnName %><%= fcType %> = (props) => {
    return <%= svg %>;
  }

  <%= memoized %>
  ${config.export === "default" ? 'export default <%= exportComponent %>' : 'export {<%= exportComponent %>}'}
`
  const compile = template(TEMPLATE);
  const component = compile({
    ...data,
    svg,
  });

  return component;
}

/**
 * Creates React component and formats with Prettier.
 * @param {string} svg Transformed SVG string.
 * @param {Object=} config Component type, SVGO and Prettier config.
 * @return {string}
 */
function format(svg, config) {
  const component = reactify(svg, config);
  const formatted = prettier.format(component, {
    // TODO: add prettier config suppoer
    parser: 'babel',
  });

  return formatted;
}

module.exports = format;
