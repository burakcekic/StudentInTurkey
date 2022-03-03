const mongo = require("./mongoCon");
const generalManager = require("../../controller/generalManager");

const dbName  = new generalManager.YamlManager().getMongoDB(); // db name

async function getAllData(collectionName){
    await mongo.mongoConn.connect();
    var response = await mongo.mongoConn.db(dbName).collection(collectionName).find().toArray();
    
    return response;
}

async function getAllDataCount(collectionName){
    await mongo.mongoConn.connect();
    var response = await mongo.mongoConn.db(dbName).collection(collectionName).find().count();
    
    return response;
}

async function getDataWithConditionCount(collectionName,condition){
    await mongo.mongoConn.connect();
    var response = await mongo.mongoConn.db(dbName).collection(collectionName).find(condition).count();
    
    return response;
}

async function getDataWithCondition(collectionName,condition)
{
    await mongo.mongoConn.connect();
    var response = await mongo.mongoConn.db(dbName).collection(collectionName).find(condition).toArray(); 
    return response;
}

async function getDataRowWithCondition(collectionName,condition,row){
    await mongo.mongoConn.connect();
    var response = await mongo.mongoConn.db(dbName).collection(collectionName).find(condition,row).toArray(); 
    
    return response;
}

async function getDataRowWithCondition2(collectionName,condition,row){
    await mongo.mongoConn.connect();
    var response = await mongo.mongoConn.db(dbName).collection(collectionName).find(condition,row).limit(500).toArray(); 
    
    return response;
}

 
async function getDataWithPager(collectionName,condition,index,limit)
{
    await mongo.mongoConn.connect();
    var response = await mongo.mongoConn.db(dbName).collection(collectionName).find(condition).skip(index).limit(limit).toArray();
    return response;
}

async function updateData(collectionName,condition,data)
{ 
    var newData = { $set: data };
    await mongo.mongoConn.connect();
    var response = await mongo.mongoConn.db(dbName).collection(collectionName).updateOne(condition,newData);
    return response;
}


module.exports.updateData = updateData;
module.exports.getAllData = getAllData;
module.exports.getAllDataCount = getAllDataCount; 
module.exports.getDataWithPager = getDataWithPager;
module.exports.getDataWithCondition = getDataWithCondition; 
module.exports.getDataRowWithCondition = getDataRowWithCondition;
module.exports.getDataRowWithCondition2 = getDataRowWithCondition2;
module.exports.getDataWithConditionCount = getDataWithConditionCount;