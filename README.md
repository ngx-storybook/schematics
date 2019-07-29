# Schematics for Angular and Storybook Workshops

## Installation

```shell script
ng add @ngx-storybook/schematics
```

This schematic automatically adjusts `.storybook/config.js` to include all `stories.ts` files inside the `src` folder, not only from `src/stories`.

## Usage

```shell script
ng g @ngx-storybook/schematics:c button
```

This command creates a module, component and a story with the given name.
