const sequelize = require('sequelize');
const dbUtil = require("./DbUtil");
const schema = require('../connection/ormCon');

//fonksiyonların oluştuğu yer

async function getAllFields(tableName) {
  let result = await dbUtil.findModel(tableName).findAll();
  return result;
}

async function getAllFieldsAttr(tableName, attrs) {
  let result = await dbUtil.findModel(tableName).findAll({ attributes: attrs });
  return result;
}

async function getFieldWithCondition(tableName, condition) {
  let result = await dbUtil.findModel(tableName).findAll({ where: condition });

  return result;
}

async function getFieldAttrWithCondition(tableName, condition, attrs) {
  let result = await dbUtil.findModel(tableName).findAll({ where: condition, attributes: attrs });
  return result;
}

async function getLastField(tableName, condition, order) {
  let result = await dbUtil.findModel(tableName).findAll(
    {
      where: condition,
      order: [[order, "DESC"]],
      limit: 1
    }
  );

  return result;

}

async function getFirstField(tableName, condition, order) {
  let result = await dbUtil.findModel(tableName).findAll(
    {
      where: condition,
      order: [[order, "ASC"]],
      limit: 1
    }

  );

  return result;
}

async function getFieldCount(tableName, condition) {
  let result = await dbUtil.findModel(tableName).count({ where: condition });
  return result;
}

async function getDistinctField(tableName, attr) {
  let result = await dbUtil.findModel(tableName).aggregate(attr[0], "DISTINCT", { plain: false })//findAll({attributes:attr,distinct:true});
  //MyModel.aggregate('teh_field', 'DISTINCT', { plain: false }).then(...)
  return result;
}


async function deleteField(tableName, condition) {

  var flag = false;
  try {
    await dbUtil.findModel(tableName).destroy({ where: condition });
    flag = true;
  }
  catch (err) {
    console.log(err);
    flag = false;
  }

  return flag;
}

async function insertField(tableName, data) {
  var flag = false;
  try {
    await dbUtil.findModel(tableName).create(data);

    flag = true;
  }
  catch (err) {
    console.log(err);
    flag = false;
  }

  return flag;

}

async function bulkInsert(tableName, data) {
  var flag = false;
  try {
    await dbUtil.findModel(tableName).bulkCreate(data);

    flag = true;
  }
  catch (err) {
    console.log(err);
    flag = false;
  }

  return flag;

}


async function updateField(tableName, data, condition) {
  var flag = false;

  try {
    await dbUtil.findModel(tableName).update(data, { where: condition });

    flag = true;

  }
  catch (err) {
    console.log(err);
    flag = false;
  }

  return flag;
}

async function closeConnectionPool(tableName) {
  await dbUtil.findModel(tableName).schema.connectionManager.pool.destroyAllNow()
    .then(function () {
      console.log("veri tabanı bağlantısı kapandı");
    }).catch(function (err) {
      console.log("bağlantı kapanma hatası");
      console.log(err);
    });

  //console.log(dbUtil.findModel(tableName).schema.connectionManager);
  //dbUtil.findModel(tableName).schema.connectionManager.destroyAllNow()
  //.then(function(){
  //  console.log("veri tabanı bağlantısı kapandı");
  //});
}

async function joinField(option) 
{
  /*
  usage:
  			let option = { 
				from:{
					attr:{
						include: [],
						exclude: []
					},
					tableName:"t_customer_order",
					foreignKey:"customer_order_id",
					condition:{customer_id:customerId}
				},
				to:{
					attr:[],
					
					tableName:"t_customer_order_check",
					foreignKey:"customer_order_id",
					condition:{availability:1}
				}
			};
			getCustomerData = await mySql.joinField(option);
  */

  let from = await dbUtil.findModel(option.from.tableName);
  let to = await dbUtil.findModel(option.to.tableName);

  from.hasMany(to, { foreignKey: option.from.foreignKey });
  to.belongsTo(from, { foreignKey: option.to.foreignKey });
  /*
  let result = from.findAll({ 
    attributes:option.from.attr,
    where:option.from.condition,
    include:{   
      model:to,
      where:option.to.condition,
      attributes:option.to.attr

    }
  });
  */


  let result = to.findAll({
    attributes: option.to.attr,
    where: option.to.condition,
    include: {
      model: from,
      where: option.from.condition,
      attributes: option.from.attr
    }
  });

  return result;
}


async function callSP(queryStr, params) {
  console.log("aaa");
  /*
  öenek data
  querystr:'CALL addCustomerOrder (:email, :pwd, :device)'
  params:{replacements: { email: "me@jsbot.io", pwd: 'pwd', device: 'android', }}
  */
  return await schema.query(queryStr, params)
}

module.exports.joinField = joinField;
module.exports.getFieldCount = getFieldCount;
module.exports.getAllFields = getAllFields;
module.exports.getAllFieldsAttr = getAllFieldsAttr;
module.exports.getLastField = getLastField;
module.exports.getFirstField = getFirstField;
module.exports.getFieldWithCondition = getFieldWithCondition;
module.exports.getFieldAttrWithCondition = getFieldAttrWithCondition
module.exports.deleteField = deleteField;
module.exports.insertField = insertField;
module.exports.updateField = updateField;
module.exports.closeConnectionPool = closeConnectionPool;
module.exports.getDistinctField = getDistinctField;
module.exports.callSP = callSP;


