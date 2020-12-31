const child_process = require('child_process');
const path = require('path');
const fs = require('fs');

const defaultConfig = path.join(__dirname, 'svgo.yml');

function svgo(file, config) {
  return child_process.spawnSync('npx', ['svgo', '--config', config, file]);
}

function convert(svg) {
  return `<script>
export let width = null;
export let height = null;
export let fill = null;
export let style = null;

let className = null;

export { className as class };
</script>

${svg.replace('>', ' {style} class={className} {width} height={width === null && height === null ? \'1em\' : height} fill={fill === null ? \'currentColor\' : fill} on:click>')}`;
}

module.exports = function(input, output, config = defaultConfig) {
  svgo(input, config);
  fs.writeFileSync(output, convert(fs.readFileSync(input, 'utf8')));
};
