let config = require('./../config');
console.log(config);
module.exports =  require('knex')({
    client: 'mysql',
    connection: {
        host: config.host,
        port: config.port,
        user: config.user,
        password: config.password,
        database: config.database
  }
})