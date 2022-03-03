var nodemailer = require('nodemailer');
const mailConfig = require("./mailConfig");

async function  mailManager(from, to, subject,strMail)
{
	let response = null;
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

async function main(config,mailOptions) {

	let response = null;
	try {
		let transporter = nodemailer.createTransport(config);
  
		let info = await transporter.sendMail(mailOptions);
		console.log("Message sent: %s", info.messageId);
		console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
		response  = {status:200};
	} catch (error) {
		response = {status:401};
	}

	return response; 
}

module.exports.sendMail = main;
module.exports.mailManager = mailManager;