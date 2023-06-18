# svg-jsx-converter
A tool to convert SVG files to JSX/TSX components with minimum effort. 

For manual single file conversion check [svg2jsx](https://github.com/balajmarius/svg2jsx) which powers svg-jsx-converter.

## Get Started
You can install this package directly from `npm`:
```bash
npm install --save-dev svg-jsx-converter
# or if you prefer yarn:
yarn add -D svg-jsx-converter
```

## Usage
First you should create a config file, you can do this by running:
```bash
npx sjc init
```
SJC will assume you use `src/assets/icons` as your source directory and `src/components/icons` as your output directory. If you want to change this, you can edit the config file.

After you've put your SVG files in the source directory, you can run:
```bash
npx sjc gen
```
This will generate a JSX/TSX file for each SVG file in the source directory. The generated files will be placed in the output directory.

It also generates some other files too:
- `index` will export all the generated components as a single object.
- `icon.component` will export a component that can be used to render components by easily referring to their names.
- `types` will exports types for icon components if the `config.type` is `tsx`.

## Config
### src
The source directory which contains *.svg files.

### dest
The destination directory in which generated files will be stored.

### type
It can be either `tsx` or `jsx`. If `jsx` is selected `types.ts` will not be generated and the icon component will not include types.

### fcType
The type used for the icon component. The default generated value is `SVGFC` imported from `types.ts` for every icon. The default behaviour can be achieved by setting `config.fcType` to `default`.

### imports
An array of imports which will be added to the top of every generated file. If you intend to use custom `fcType` you should add the import for it here.

### memo
If set to `true` the generated components will be wrapped in `React.memo`.

### component
If set to `true` a component will be generated which can be used to render components with easily refering to their names.

## Contributing
If you want to contribute to this project, you can do so by creating a pull request but please make sure to open an issue first or work on an existing issue.