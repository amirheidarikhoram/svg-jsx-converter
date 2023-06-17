module.exports = {
    DEFAULT_FC_TYPE: 'SVGFC',
    DEFAULT_FC_CONTENT: `export type SVGFC = (props: React.SVGProps<SVGSVGElement>) => JSX.Element;`,
    ICON_DECLARATION: `interface IconProps {
        name: keyof typeof ICONS;
      } 
      export function Icon (props: IconProps) {
        const IconX = ICONS[props.name];
      
        return <IconX />;
      }`
}