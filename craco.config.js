const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  devServer: {
    port: 4000,
    allowedHosts: [".test"],
    historyApiFallback: {
      index: "/index.html",
    },
    proxy: {
      "/api/": {
        pathRewrite: { "^/api": "" },
        target: "https://preprod-bos.mindsay.com",
        changeOrigin: true,
        secure: false,
      },
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
  },
  webpack: {
    plugins: [
      new ModuleFederationPlugin({
        name: "flow_builder",
        filename: "remoteEntry.js",
        exposes: {
          "./FlowBuilder": "./src/bootstrap",
        },
        remotes: {
          components_library:
            "components_library@http://localhost:4001/remoteEntry.js",
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
