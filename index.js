const { loadConfig, optimize } = require("svgo");
const path = require("path");
const fs = require("fs");

const defaultConfigFile = path.join(__dirname, "svgo.config.js");

function convert(svg, ts) {
  const script = ts
    ? `<script lang="ts">
  export let width: number | string | undefined = undefined;
  export let height: number | string | undefined = undefined;
  export let fill = 'currentColor';
</script>`
    : `<script>
  export let width;
  export let height;
  export let fill = 'currentColor';
</script>`;

  const p = svg.indexOf(">");

  return (
    script + "\n\n" +
    "<!-- svelte-ignore a11y-no-static-element-interactions -->" +
    svg.slice(0, p) +
    " {width} height={!width && !height ? '1em' : height} {fill} {...$$restProps} on:click on:keydown on:keyup>" +
    svg.slice(p + 1)
  );
}

module.exports = async function (
  input,
  output,
  ts,
  configFile = defaultConfigFile
) {
  const config = await loadConfig(configFile);
  const data = fs.readFileSync(input, "utf8");

  const result = optimize(data, {
    path: input,
    ...config,
  });

  fs.writeFileSync(input, result.data);
  fs.writeFileSync(output, convert(result.data, ts));
};
