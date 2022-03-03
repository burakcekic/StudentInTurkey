let tokenControl = require("../security/token");
const mySql = require("../DB/mysql/dal/mySqldal");

async function tokenValidate(request,reply,done)
{
    let ip = request.ip;
    let isDangerIp = 0;

    if(isDangerIp == 0)
    {
        let tokenlessApiUrlArr = ["postLogin","getRegisterToken","postRegister"];
        let apiUrl = request.raw.url.split("/api/")[1];

        if(!tokenlessApiUrlArr.some((element)=>  element == apiUrl))// tokensızların içinde değilse
        {
            let tokenJson = await tokenControl.generateToken(request,reply);
            if(tokenJson != null)
            {
                request.validate = true;
                reply.header("Token",token);
                reply.header("RefreshToken",refreshToken);
            }
            else request.validate = false

        }
        else request.validate = true

    }
    else request.validate = false
    //done(); 
}

let schema = (method, url, preHandler, config, handler,schema) =>{
    console.log(schema);
    let res = {
        method: method,
        url: url,
        handler: handler,
        schema: {
            response: {
                200: {
                    type: "object",
                    properties: {
                        status: { type: 'number' },
                        message: { type: 'string' },
                        data: schema.response
                    }
                },
                500: {
                    type: "object",
                    properties: {
                        status: { type: 'number' },
                        message: { type: 'string' }
                    }
                },
                400:{
                    type: "object",
                    properties: {
                        status: { type: 'number' },
                        message: { type: 'string' },
                    }
                }
            }
        }
    };
    //if(config != null) res.config = config;
    //if(preHandler != null) res.preHandler = preHandler;
    //if(querystring != null) res.schema.querystring = querystring;
    return res
}

module.exports.tokenValidate = tokenValidate;
module.exports.schema = schema