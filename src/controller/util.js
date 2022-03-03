const securityTools = require("../security/securityTools.js");

function getJsonWithCondition(set, obj)
{
    let result = obj.filter(function(item) {
        for (var key in set) {
          if (item[key] === undefined || item[key] != set[key])
            return false;
        }
        return true;
      });
    
      return result;
}

function generateLastdatCrawlerId(lastDay)
{
  let date = new Date();
  date.setDate(date.getDate() - lastDay); 
  
  let year = date.getFullYear().toString();
  let month =  (date.getMonth()+1).toString();
  let day = date.getDate().toString();
  if(month<10){
    month="0"+month;
  }
  if(day<10){
    day="0"+day;
  }
  let newCrawlerId = year+month+day;
  return newCrawlerId;
}



function createUUID() // benzersiz id üretir
{
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

function genereteRandomPassword()
{
  let length  = 8,
      charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
  }
 
  let newPass = Array(8).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz").map(function(x){ 
    return x[Math.floor(Math.random() * x.length)] 
  }).join('');

  let newBasicPass = Math.random().toString(36).slice(-8);

  return newPass;

}

function decodeCustomerId(customerId)
{
  //let deviceId = JSON.parse(decrypt(new AppConfig().getConfigJson())).deviceId;
  //let token = CryptoJS.AES.encrypt("1234",deviceId);
  //console.log(token);
  //let unToken = CryptoJS.AES.decrypt(token, deviceId).toString(CryptoJS.enc.Utf8);
  //console.log(unToken);
  let replaceCustomerId = customerId.split('xMl3Jk').join('+').split("Por21Ld").join("/").split("Ml32").join("=");
  return securityTools.cryptoJsDecrypt(replaceCustomerId);
} 

function encodeCustomerId(customerId)
{
  //selectedId = CryptoJS.AES.encrypt(selectedId,decrypt(localStorage.decodeConfig)).toString().replaceAll('+',"xMl3Jk").replaceAll("/","Por21Ld").replaceAll("=","Ml32");
  return securityTools.cryptoJsEncrypt(customerId).toString().split('+').join('xMl3Jk').split("/").join("Por21Ld").split("=").join("Ml32");
  
}


module.exports.createUUID = createUUID;
module.exports.decodeCustomerId =decodeCustomerId;
module.exports.encodeCustomerId = encodeCustomerId;
module.exports.getJsonWithCondition = getJsonWithCondition;
module.exports.genereteRandomPassword = genereteRandomPassword;
module.exports.generateLastdatCrawlerId = generateLastdatCrawlerId;