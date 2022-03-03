const user = require("../model/User");
const userDetail = require("../model/UserDetail");

function findModel(tableName)
{   
    if(tableName == "t_user")                                   model = user;
    if(tableName == "t_user_detail")                            model = userDetail;

    return model;
}


module.exports.findModel = findModel;