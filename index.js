const { loadConfig, extendDefaultPlugins, optimize } = require('svgo');
const path = require('path');
const fs = require('fs');

const defaultConfigFile = path.join(__dirname, 'svgo.config.js');

function convert(svg) {
  return `<script>
  let className = undefined;

  export { className as class };
  export let width = undefined;
  export let height = undefined;
  export let fill = 'currentColor';
  export let style = undefined;
</script>

${svg.replace('>', ' {style} class={className} {width} height={!width && !height ? \'1em\' : height} {fill} on:click>')}
`;
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
