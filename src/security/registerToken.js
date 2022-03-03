const config = require("./securityConfig");
const jwt = require("jsonwebtoken");

async function generateToken(req, res)
{
    console.log(req.headers);
    let response = null;
    let token = req.headers["x-access-token"] || req.headers["authorization"];
    if(token != undefined && token !="" && token.startsWith("Bearer "))// token var yok kontrolü
    {
        token = token.slice(7,token.length); // token'ın başından "Bearer " kısmınmı atar
    }

    if(token && token != undefined && token != "undefined")
    {
        response = jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                console.log(err);
                return {success: false,message: 'Token is not valid'};
            } 
            else 
            {

                let refreshToken = req.headers['refreshtoken'];

                if(refreshToken && refreshToken != undefined && refreshToken != "undefined" && refreshToken != "" && refreshToken != null)
                {
                    response =  jwt.verify(token,config.secret,function(err,decoded){
                        if(decoded){return {token:token}}
                    });

                }
                
            }
        });

    }
    return response;

}
module.exports.generateToken = generateToken;