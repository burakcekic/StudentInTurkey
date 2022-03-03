const fs = require('fs');
const CryptoJS = require("crypto-js");
const config = require("./securityConfig");
const bcrypt = require("bcryptjs");

function cryptoJsDecrypt(encrypted)
{
    return CryptoJS.AES.decrypt(encrypted, config.deviceId).toString(CryptoJS.enc.Utf8);
}

function cryptoJsEncrypt(pass)
{
    
    return CryptoJS.AES.encrypt(pass, config.deviceId).toString();
}

function decrypt(password) {
    let keyStr = "ABCDEFGHIJKLMNOP" +
        "QRSTUVWXYZabcdef" +
        "ghijklmnopqrstuv" +
        "wxyz0123456789+/" +
        "=";
 
    var output = "";
 
    var i = 0;   
    password = password.replace("/[^ A - Za - z0 - 9\+\/\=] / g", "");    
    do {
        var enc1 = keyStr.indexOf(password[i++]);
        var enc2 = keyStr.indexOf(password[i++]);
        var enc3 = keyStr.indexOf(password[i++]);
        var enc4 = keyStr.indexOf(password[i++]);
 
        var chr1 = (enc1 << 2) | (enc2 >> 4);
        var chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        var chr3 = ((enc3 & 3) << 6) | enc4;
 
        output = output + String.fromCharCode(chr1);
        if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
        }
        chr1 = chr2 = chr3 = null;
        enc1 = enc2 = enc3 = enc4 = null;
    } while (i < password.length);    
    output = unescape(output);    
    var pattern = new RegExp("[|]");
    output = output.replace(pattern, "+");
    return output;
}

function encrypt(password) 
{
 
    let keyStr = "ABCDEFGHIJKLMNOP" +
        "QRSTUVWXYZabcdef" +
        "ghijklmnopqrstuv" +
        "wxyz0123456789+/" +
        "=";

    password = password.split('+').join('|');
    //let input = escape(password);
    /* let input = password; */
    let input = encodeURI(password);
    let output = "";
    let chr1, chr2, chr3;
    let enc1, enc2, enc3, enc4;
    let i = 0;

    do {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;

        }
        output = output +
            keyStr.charAt(enc1) +
            keyStr.charAt(enc2) +
            keyStr.charAt(enc3) +
            keyStr.charAt(enc4);
        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";
    } while (i < input.length);
    //console.log("Password :" + output);
    return output;
}

function generateBcryptHash(param)
{
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(param,salt);
    return hash;
}

function compareBcryptHash(hash,unHash)
{
    return bcrypt.compareSync(unHash,hash);
}

module.exports.generateBcryptHash = generateBcryptHash;
module.exports.compareBcryptHash = compareBcryptHash;
module.exports.cryptoJsEncrypt = cryptoJsEncrypt;
module.exports.cryptoJsDecrypt = cryptoJsDecrypt;
module.exports.encrypt = encrypt;
module.exports.decrypt = decrypt;