const fs = require('fs');
const yaml = require('js-yaml');
var nodemailer = require('nodemailer');


class YamlManager
{
    constructor()
    {
        try 
        {
            this.fileContents = fs.readFileSync('../src/assets/config.yaml', 'utf8');
            
            this.data = yaml.load(this.fileContents);
            
            this.yamlData = this.data.config;
            this.jsonData = JSON.stringify(this.yamlData, null, 2);
            this.jsonData = JSON.parse(this.jsonData);
            
        } catch (err) {
            console.log(err);
        }

    }
    //db - sql
    
    getMySqlConnection()
    {
        return this.jsonData.db.mySql.connection
    }

    getMySqlDB()
    {
        return this.jsonData.db.mySql.db
    }
    
    //db - mongo
    getMongoConnection()
    {
        return this.jsonData.db.mongo.connection.url
    }
    getMongoDB()
    {
        return this.jsonData.db.mongo.db.dbName
    }
    getMongoTables()
    {
        return this.jsonData.db.mongo.tables
    }

    getGeneral()
    {
        return this.jsonData.general
    }

    getSecurity()
    {
        return this.jsonData.security
    }

    getUser()
    {
        return this.jsonData.user
    }

}

async function mailManager(from, to, subject,strMail)
{
	let response = null;
    let mailConfig = new YamlManager().getMail();
	try
	{
		let config = {
			host: mailConfig.mailServiceHosting,
			port: mailConfig.port,
			secure: false, 
			auth: {
			  user: mailConfig.infoMailAuth.user,
			  pass: mailConfig.infoMailAuth.pass
			},
			tls: {   rejectUnauthorized: false}
		};
	
		let mailOptions = { 
			from:{
				name: 'nSpider',
				address: from
			},
			to: to,
			subject:subject,
			html:strMail
		}

		let transporter = nodemailer.createTransport(config);
  
		let info = await transporter.sendMail(mailOptions);
		console.log("Message sent: %s", info.messageId);
		console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
		response  = {status:200};

	}
	catch(err)
	{
		console.log(err);
		response = {status:401};
	}
}


module.exports.mailManager = mailManager;
module.exports.YamlManager = YamlManager;