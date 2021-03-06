let configs = {
  test: {
    secret: 'supersecretykey',
    dbURL: 'mongodb://localhost:27017/postman-twitter-test',
    port: 3000
  },
  dev: {
    secret: 'supersecretykey',
    dbURL: 'mongodb://localhost:27017/postman-twitter-dev',
    port: 3000
  },
  prod: {
    secret: 'supersecretykey',
    dbURL: 'mongodb://localhost:27017/postman-twitter',
    port: 3000
  }
}


let config = null

switch (process.NODE_ENV) {
case 'TEST': config = configs.test; break;
case 'PROD': config = configs.prod; break;
case 'DEV':
default: config = configs.dev; break;
}

config.secret = process.env.SECRET || config.secret
config.port = process.env.PORT || config.port
config.dbURL = process.env.DBURL || config.dbURL

console.log('config', config)

module.exports = config
