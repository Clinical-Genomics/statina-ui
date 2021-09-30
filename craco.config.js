const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#43C59E',
              '@layout-header-background': '#14453D',
              '@link-color': '#16a4f2',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
