const mongo = require("../DB/mongo/mongoDal")
const generalManager = require("../controller/generalManager"); 

async function getUnivercityPrograms(request,reply)
{
	const indexName =  new generalManager.YamlManager().getMongoTables()[0];
	let data = await mongo.getAllData(indexName);
	return data;
}

async function getUniversities(request,reply)
{
	const indexName =  new generalManager.YamlManager().getMongoTables()[1];
	let data = await mongo.getAllData(indexName);
	return data;
}

async function getUniversityDetails(request,reply)
{
	const indexName = "university-details";
	let data = await mongo.getAllData(indexName);
	return data;
}


async function getCities(request,reply)
{
	const indexName =  new generalManager.YamlManager().getMongoTables()[2];
	let data = await mongo.getAllData(indexName);
	return data;
}

async function getAllFraq(request,reply)
{
	const indexName =  new generalManager.YamlManager().getMongoTables()[3];
	let data = await mongo.getAllData(indexName);
	return data;
}

 

module.exports.getUnivercityPrograms = getUnivercityPrograms; 
module.exports.getUniversities = getUniversities;
module.exports.getCities = getCities;
module.exports.getAllFraq = getAllFraq;
module.exports.getUniversityDetails = getUniversityDetails;