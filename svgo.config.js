module.exports = {
  multipass: true,

  plugins: [
    'cleanupListOfValues',
    'removeRasterImages',
    'sortAttrs',
    'removeDimensions',
    'removeScriptElement',

    {
      name: 'cleanupIDs',

      params: {
        minify: false
      }
    },

    {
      name: 'removeViewBox',
      active: false
    },

    {
      name: 'removeAttrs',

      params: {
        attrs: [
          'svg:width',
          'svg:height',
          'svg:fill',
          'svg:class',
          'p-id'
        ]
      }
    }
  ],

  js2svg: {
    pretty: true,
    indent: 2
  }
};
