# svg2svelte
Tool to convert SVG to Svelte component.

## Usage
### Command line
```sh
npx svg2svelte icon.svg Icon.svelte
```

### Library
```js
const svg2svelte = require('svg2svelte');
svg2svelte('icon.svg', 'Icon.svelte');
```

### Component Props
```html
<Icon width="10" height="10" fill="#fff" class="icon" style="background: #fff" />
```
All props are optional.

if neither `width` nor `height` is provided, `height` will be set to `1em`.

## License
[MIT](LICENSE)
