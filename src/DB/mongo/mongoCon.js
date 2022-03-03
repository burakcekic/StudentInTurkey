const {MongoClient} = require("mongodb");
const generalManager = require("../../controller/generalManager");

const url = new generalManager.YamlManager().getMongoConnection();
const client = new MongoClient(url,{useNewUrlParser:true, useUnifiedTopology:true});
 
module.exports.mongoConn = client;