var nodemailer = require('nodemailer');

/*
const transporter = nodemailer.createTransport({
  service: 'http://mail.nspider.io/',//smtp.gmail.com  //in place of service use host...
  secure: false,//true
  port: 587, //25,//465
  auth: {
      user: 'info@nspider.io',
      pass: '!Tb2019Na*'
  }, tls: { 
    rejectUnauthorized: false
  }
});


transporter.sendMail = function (mailRequest) {
	return new Promise(function (resolve, reject) {
		console.log(reject);
		transporter.sendMail(mailRequest, (error, info) => {
			if (error) {
				console.log("send mail hatası");
				reject(error);
			} else {
				resolve("The message was sent!");
			}
		});
	});
}
*/

function sendMail (mailOptions)
{
	console.log(mailOptions);
	const transporter = nodemailer.createTransport({
		service: 'http://mail.nspider.io/',//smtp.gmail.com  //in place of service use host...
		//secure: false,//true
		//port: 587, //25,//465
		auth: {
			user: 'info@nspider.io',
			pass: '!Tb2019Na*'
		}, 
		//tls: {   rejectUnauthorized: false}
	  });
	  transporter.sendMail(mailOptions, function(error, info){
		if (error) {
			console.log("AAA");
		  console.log(error);
		} else {
		  console.log('Email sent: ' + info.response);
		}
	  });
	  
}
async function main(config,mailOptions) {
	console.log("eeee");
	//console.log(config);
	/*
	let transporter = nodemailer.createTransport(config);
	// send mail with defined transport object
	transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Message sent: ' + info.message);
            transport.close();
        }
	})
	*/
	return {"status":200}
	
  }

module.exports.sendMail = main;