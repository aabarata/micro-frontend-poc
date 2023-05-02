const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");

const deps = require("./package.json").dependencies;

module.exports = {
  devServer: {
    port: 4002,
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
        name: "analytics_dashboard",
        filename: "remoteEntry.js",
        exposes: {
          "./AnalyticsDashboard": "./src/bootstrap",
        },
        remotes: {
          components_library:
            "components_library@http://localhost:4001/remoteEntry.js",
        },
        shared: {
          react: {
            singleton: true,
            requiredVersion: deps.react,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: deps["react-dom"],
          },
        },
      }),
      new ExternalTemplateRemotesPlugin(),
    ],
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.output = {
        ...webpackConfig.output,
        publicPath: "http://localhost:4002/",
      };
      return webpackConfig;
    },
  },
};
