import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackClientConfig from './../webpack.config.client';

import config from "./../config/config"

const compile = (app) => {
  if(config.env === "development") {
    const compiler = webpack(webpackClientConfig);
    const middleware = webpackDevMiddleware(compiler, { publicPath: webpackClientConfig.output.publicPath });
    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));
  }
};

export default { compile };