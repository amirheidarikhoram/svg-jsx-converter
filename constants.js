/** @typedef {{src: string, dest: string, type: 'tsx' | 'jsx', imports: string[], fcType?: string, memo: boolean, component: boolean}} Config */

module.exports = {
  DEFAULT_FC_TYPE: 'SVGFC',
  DEFAULT_FC_CONTENT: `import React from 'react';
export type SVGFC = (props: React.SVGProps<SVGSVGElement>) => React.ReactNode;`,
  ICON_DECLARATION_TSX: `import {ICONS} from '.';

interface IconProps {
  name: keyof typeof ICONS;
}

export function Icon (props: IconProps) {
  const IconX = ICONS[props.name];    
  return <IconX />;
}`,
  ICON_DECLARATION_JSX: `import {ICONS} from '.';

export function Icon ({name}) {
  const IconX = ICONS[name];    
  return <IconX />;
}`,
  /**
   * @type {Partial<Config>}
   */
  DEFAULT_CONFIG: {
    type: "tsx",
    imports: [],
    memo: false,
    fcType: "default",
    component: true,
    cleanupIDs: true
  },
  DEFAULT_CONFIG_CONTENT: `module.exports = {
    src: './src/assets/icons',
    dest: './src/components/icons',
    type: 'tsx',
    imports: [],
    memo: false,
    fcType: 'default',
    component: true,
    cleanupIDs: true
}`
}