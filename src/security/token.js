const config = require("./securityConfig");
const jwt = require("jsonwebtoken");

async function validateApiToken(req, res)
{
    let response = null;
    let token = req.headers["x-access-token"] || req.headers["authorization"];
    
    if(token != undefined && token !="" && token.startsWith("Bearer "))// token var yok kontrolü
    {
        token = token.slice(7,token.length); // token'ın başından "Bearer " kısmınmı atar
    }

    if(token && token != undefined && token != "undefined") 
    {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                console.log(err);
                return {success: false,message: 'Token is not valid'};
            } 
            else 
            {
                req.decoded = decoded;//decoded jwt üzeridnen döner
                let exp = new Date(decoded.exp*1000); // exp token'ın biteceği süreyi belirler
                let now = new Date();
                let diff = exp.getTime()-now.getTime();
                let resultMin = Math.round(diff/60000); //dakika cinsinden
                if(resultMin < 15) //15 dk'dan küçük olcak  
                { 
                    let refreshToken = req.headers['refreshtoken'];
                    if(refreshToken && refreshToken != undefined && refreshToken != "undefined" && refreshToken != "" && refreshToken != null)
                    {
                        response = jwt.verify(refreshToken,config.secret,(err, decoded) =>{
                            if (err) {
                                console.log(err);
                                //return {success: false,message: 'Token is not valid'};
                                return{token:null,refreshToken:null};
                            }
                            else
                            {
                                let  newToken = jwt.sign({username:decoded.username},config.secret,{expiresIn: 60 * 60 });
                                let newRefreshToken = jwt.sign({username:decoded.username},config.secret,{expiresIn: 60 * 60 *2 });
                                return{token:newToken,refreshToken:newRefreshToken};
                            }
                        });
                    }
                }
                else // eğer set etme tarihi gecikmediyse varsayılan token'ları döndürür
                {
                    let refreshToken = req.headers['refreshtoken'];
                    if(refreshToken && refreshToken != undefined && refreshToken != "undefined" && refreshToken != "" && refreshToken != null)
                    {
                        response =  jwt.verify(refreshToken,config.secret,function(err,decoded){
                            if(decoded){return {token:token,refreshToken:refreshToken}}
                        });
                    }
                }
            }
        });
    }

    return response;

}

function generateToken(data,secret,dateTime)
{
    return jwt.sign(data, secret,{expiresIn: dateTime });
}

async function generateUrlToken(token)
{

    if(token && token != undefined && token != "undefined")
    {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                console.log(err);
                return {success: false,message: 'Token is not valid'};
            } 
            else 
            {
                response =  jwt.verify(token,config.secret,function(err,decoded){
                    if(decoded){return {token:token}}
                });
            }
        });
    }

    return response;

}

async function decodeToken(token)
{
    let response = null;
    if(token && token != undefined && token != "undefined" && token != "null" && token != null)
    {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                //console.log(err);
                response =  {success: false,message: 'Token is not valid'};
            } 
            else 
            {
                response =  jwt.verify(token,config.secret,function(err,decoded){
                    if(decoded) return {token:decoded, success: true, message: 'Token is valid'}
                });
            }
        });
    }
    return response;
}

module.exports.decodeToken = decodeToken;
module.exports.validateApiToken = validateApiToken;
module.exports.generateUrlToken = generateUrlToken;
module.exports.generateToken = generateToken;