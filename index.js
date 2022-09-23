const { loadConfig, optimize } = require('svgo');
const path = require('path');
const fs = require('fs');

const defaultConfigFile = path.join(__dirname, 'svgo.config.js');

function convert(svg, ts) {
  const script = ts
    ? `<script lang="ts">
  let className: string | undefined = undefined;

  export { className as class };
  export let width: number | string | undefined = undefined;
  export let height: number | string | undefined = undefined;
  export let fill = 'currentColor';
  export let style: string | undefined = undefined;
</script>`
    : `<script>
  let className = undefined;

  export { className as class };
  export let width = undefined;
  export let height = undefined;
  export let fill = 'currentColor';
  export let style = undefined;
</script>`;

  return script + '\n\n' +
    svg.replace(
      '>',
      ' {style} class={className} {width} height={!width && !height ? \'1em\' : height} {fill} on:click>'
    );
}

module.exports = async function(input, output, ts, configFile = defaultConfigFile) {
  const config = await loadConfig(configFile);
  const data = fs.readFileSync(input, 'utf8');

  const result = optimize(data, {
    path: input,
    ...config
  });

  fs.writeFileSync(input, result.data);
  fs.writeFileSync(output, convert(result.data, ts));
};
