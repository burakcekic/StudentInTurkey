const CryptoJS = require("crypto-js");
const fs = require('fs').promises;

let mySql = require("../DB/mysql/dal/mySqldal"); 
const util = require("../controller/util");
const config = require("../security/securityConfig");
const securityTools = require("../security/securityTools");
const securityToken = require("../security/token");
const generalManager = require("../controller/generalManager");
const YamlManager = require("../controller/generalManager").YamlManager;

async function postUserValidate(request,reply)
{
	let response  = null;
 
    try {

        let token = request.body.token; 

        let allUser = await mySql.getAllFieldsAttr("t_user",["user_id"]);
        
        flag = false;
        for (let i = 0; i < allUser.length; i++) 
        {
            const e = allUser[i]; 
            if(securityTools.compareBcryptHash(token,String(e.user_id)))
            {

                flag = true;
                break;
            } 
        } 
        if(flag) return {status:200,message:"token geçerli",validate:true}
        else return {status:200,message:"token geçersiz",validate:false}
        
    } catch (error) {
        console.log(error);
        return null;
    }
 
	return response;
    
}

async function getUserWithDetail(request,reply)
{
	let response  = null;
 
    try {

        let userId = parseInt(request.params.userId);
 

        let userData = await mySql.getFieldWithCondition("t_user",{user_id:userId});
        let userDetailData = await mySql.getFieldWithCondition("t_user_detail",{user_id:userId});
 
        let data = {};
        data.first_name = userData[0].first_name;
        data.last_name = userData[0].last_name;
        data.email = userData[0].email;
        data.citizenship = userData[0].citizenship;
        data.phone = userData[0].phone; 
        data.gender = (userDetailData.length > 0)? userDetailData[0].gender: "";
        data.birth_date =(userDetailData.length > 0)? userDetailData[0].birth_date: "";
        data.price_range =(userDetailData.length > 0)? userDetailData[0].price_range: "";
        data.education_level =(userDetailData.length > 0)? userDetailData[0].education_level: "";
        data.education_level_preference =(userDetailData.length > 0)? userDetailData[0].education_level_preference: "";
        
        response = {status:200,data:data,message:"işlem başarılı"}
        
    } catch (error) {
        console.log(error);
        return null;
    }
 
	return response;
    
}



module.exports.postUserValidate = postUserValidate;
module.exports.getUserWithDetail = getUserWithDetail;