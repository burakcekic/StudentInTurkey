
const CryptoJS = require("crypto-js");
const fs = require('fs').promises;

let mySql = require("../DB/mysql/dal/mySqldal"); 
const util = require("../controller/util");
const config = require("../security/securityConfig");
const securityTools = require("../security/securityTools");
const securityToken = require("../security/token");
const generalManager = require("../controller/generalManager");
const YamlManager = require("../controller/generalManager").YamlManager;

async function postLogin(request,reply)
{

	let response = null;

	var data = request.body;

	var username = data.username; 
	var password = securityTools.decrypt(data.password);  

	let user = await mySql.getFieldWithCondition("t_user",{email:username});
	if(user.length > 0 )  
	{
		if(user[0].status == 0 )  
		{	 
			if(securityTools.compareBcryptHash(user[0].password,password)) 
			{
				let token = securityTools.generateBcryptHash(String(user[0].user_id))

				response={
					status:200,
					message:"PostLoginVaildMsg",
					data:[
						{ 
							userData:user,
							token:token
						}
					]
				}
			}
			else response =  {data:"fail",code:401,message:"PostLoginPassFailMsg"};
		}
		else response =  {data:"fail",code:401,message:"PostLoginLEDFailMsg"}; 
		
	}
	else  response =  {data:"fail",code:401,message:"PostLoginEmailFailMsg"}; 

	await mySql.closeConnectionPool("t_customer_profile");
	return response; 
	
}

async function postRegister(request,reply)
{

	let data = request.body;
	let userData = await mySql.getFieldWithCondition("t_user",{email:data.email});

	if(userData.length === 0)
	{
		let unHashPass = securityTools.decrypt(data.password);
		if(unHashPass != null && unHashPass != undefined && unHashPass != "" && unHashPass  != "undefined")
		{ 
			let hash = securityTools.generateBcryptHash(data.password);
 
			let userData = {
				first_name:data.firstName,
				last_name:data.lastName,
				email:data.email,
				password:hash,
				role:0,
				status:0,
				phone:data.phone,
			};
			
			userDataResult = await mySql.insertField("t_user",userData);
			let insertedData = await mySql.getFieldAttrWithCondition("t_user",{email:data.email});

			await mySql.insertField("t_user_detail",{user_id:insertedData[0].user_id});
			if(userDataResult) return {data: [],code:200,message:"kullanıcı eklendi"};	
			else return {data:"fail",code:401,message:"kullanıcı eklenemedi lütfen tekrar ekleyin"};

		}
		return {data:"fail",code:401,message:"Sisteme izinsiz giriş yapmış bulunmaktasınız"};
	}
	else return {data:"fail",code:401,message:"Bu emaile ait bir kullanıcı zaten var lütfen tekrar başka bir mail adresi ile giriş yapın"};
   
}

async function postUserDetail(request,reply)
{
	let response  = null;
    if(request.validate)
    {
		try {

			let data = request.body; 
			let userId = parseInt(util.decodeCustomerId(data.condition.userId));

			let password = securityTools.cryptoJsDecrypt(data.set.userData.password);
			let hash = await securityTools.generateBcryptHash(password);
		
			let userData = data.set.userData;
			userData.password = hash;

			let userDetailData = data.set.userDetailData;

			await mySql.updateField(("t_user_detail",userData,{user_id:userId}));

			let isHasDetail = await mySql.getFieldWithCondition("t_user_detail",{user_id:userId});
			if(isHasDetail.length > 0) await mySql.updateField(("t_user_detail",userDetailData,{user_id:userId}));
			else await mySql.insertField(("t_user_detail",userDetailData));

			
		} catch (error) {
			console.log(error);
			return null;
		}
	}
	return response;
    
}

async function postForgatPass(request,reply)
{
	let response  = null;

	let username = request.body.username;
	let dbData = await mySql.getFieldWithCondition("t_customer_profile",{username:username});
	if(dbData.length > 0)
	{
		let customerId = dbData[0].customer_id; 
		let newPass = util.genereteRandomPassword();
		//let encodeNewPass = securityTools.cryptoJsEncrypt(newPass);
		let encodeNewPass = await securityTools.generateBcryptHash(newPass);
		
		let set = {password:encodeNewPass};
		let condition = {customer_id:customerId};

		
		let updateData = await mySql.updateField("t_user",set,condition);   
		updateData = await mySql.updateField("t_customer_profile",set,condition); 
		if(updateData)
		{ 


			  let to = username;
			  let strHtml = await fs.readFile('../src/assets/mails/pasEmail.txt', 'utf-8');

			  let name = dbData[0].name;
			  
			  let firstChanged = strHtml.replace("....",name);
			  let lastChanged = firstChanged.replace(",,,,",newPass);

	
			
			let mail = await generalManager.mailManager(to, "nSpider Şifre Güncelleme", lastChanged);
			
			if(mail.status == 200)
			{
				response = {
					status:200,
					message:"ApiResponseSuccsessMessage",
					header:"İşlem başarılı",
					data:"ok"
				}
			}
			else {
				response = {
					status:401,
					message:"ApiResponseFailMailMessage",
					header:"Uyarı",
					data:"ok"
				}
			}
		}
		else{
			response = {
				status:403,
				message:"ApiResponseFailMessage",
				header:"warning",
				data:null
			}
		}
	}
	else
	{
		response = {
			status:403,
			message:"girmiş olduğunuz email sistemimizde bulunmamaktadır",
			header:"warning",
			data:null
		}
	}
	return response;
}

async function homepageContactMail(request,reply)
{      
	let response  = null;

	var data = request.body; 
 
	let strHtml = await fs.readFile('../src/assets/mails/homepageContact.txt', 'utf-8');

	let changeName = strHtml.replace("....", data.name);
	let changeEmail = changeName.replace(",,,,", data.email);
	let changePhone = changeEmail.replace("!!!!",data.phone);
	let changeMessage = changePhone.replace("????",data.message);

	let mailConfig = new YamlManager().getMail();
	let to = mailConfig.infoMailAuth.user;
	let mailStatus = await generalManager.mailManager( to, "Anasayfa İletişim",changeMessage);
	response = {status:200, message:"Mesajınız gönderilmiştir"};
	
	return response;
}



module.exports.postLogin = postLogin;
module.exports.postRegister = postRegister;
module.exports.postForgatPass = postForgatPass;
module.exports.homepageContactMail = homepageContactMail; 
module.exports.postUserDetail = postUserDetail;