const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  devServer: {
    port: 4000,
  },
  webpack: {
    plugins: [
      new ModuleFederationPlugin({
        name: "flow_builder",
        filename: "remoteEntry.js",
        exposes: {
          "./FlowBuilder": "./src/bootstrap",
        },
      }),
    ],
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.output = {
        ...webpackConfig.output,
        publicPath: "http://localhost:4000/",
      };
      return webpackConfig;
    },
  },
};
