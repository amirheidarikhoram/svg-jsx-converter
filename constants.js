module.exports = {
  DEFAULT_FC_TYPE: 'SVGFC',
  DEFAULT_FC_CONTENT: `import React from 'react';
export type SVGFC = (props: React.SVGProps<SVGSVGElement>) => React.ReactNode;`,
  ICON_DECLARATION: `import React from 'react';
import {ICONS} from '.'

interface IconProps {
  name: keyof typeof ICONS;
}

export function Icon (props: IconProps) {
  const IconX = ICONS[props.name];    
  return <IconX />;
}`
}