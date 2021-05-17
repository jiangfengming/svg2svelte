const { loadConfig, extendDefaultPlugins, optimize } = require('svgo');
const path = require('path');
const fs = require('fs');

const defaultConfigFile = path.join(__dirname, 'svgo.config.js');

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

module.exports = async function(input, output, configFile = defaultConfigFile) {
  const config = await loadConfig(configFile);
  const data = fs.readFileSync(input, 'utf8');

  const result = optimize(data, {
    path: input,
    ...config,
    plugins: extendDefaultPlugins(config.plugins)
  });

  fs.writeFileSync(input, result.data);
  fs.writeFileSync(output, convert(result.data));
};
