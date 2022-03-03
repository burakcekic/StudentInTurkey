const Sequelize = require('sequelize');
var generalManager = require("../../../controller/generalManager");

let mySqlConnConfig = new generalManager.YamlManager().getMySqlConnection();
let mySqlDbConfig = new generalManager.YamlManager().getMySqlDB();

let sequelize = new Sequelize(mySqlDbConfig.dbName,mySqlConnConfig.user,mySqlConnConfig.password, {
    host: mySqlConnConfig.host,
    dialect: 'mysql', 
    operatorsAliases: false,
    dialectOptions: {
        encrypt: false
    }
    ,
    pool: {
        max: 1,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
//Test sequelize
sequelize.authenticate()
    .then(function(data){console.log(mySqlDbConfig.dbName + " veri tabanına bağlandı");})
    .catch(err => console.log("Error: " + err));


module.exports = sequelize;  