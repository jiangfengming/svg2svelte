module.exports = {
  multipass: true,

  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          removeViewBox: false,
          removeUselessStrokeAndFill: {
            stroke: false,
          },
        },
      },
    },
    "cleanupListOfValues",
    "removeRasterImages",
    "removeDimensions",
    "removeScriptElement",

    {
      name: "removeAttrs",
      params: {
        attrs: ["svg:width", "svg:height", "svg:fill", "svg:class", "p-id"],
      },
    },
  ],

  js2svg: {
    pretty: true,
    indent: 2,
  },
};
