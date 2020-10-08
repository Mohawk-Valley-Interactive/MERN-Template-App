const config = {
  cert: process.env.CERT || '',
  env: process.env.NODE_ENV || 'development',
  key: process.env.KEY || '',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "DEV_JWT_SECRET",
  mongoUri: process.env.MONGODB_URI || process.env.MONGO_HOST || 'mongodb://' + (process.env.IP || 'localhost') + ':' + (process.env.MONGO_PORT || '27017') + '/mern_template_app'
};

export default config;