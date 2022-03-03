var generalManager = require("../generalManager");
let conf =  new generalManager.YamlManager().getMail();

module.exports = conf;
/*{
    mailServiceHosting:"mail.nspider.io",
    port:587,
    infoMailAuth:{
		user: 'info@nspider.io',
		pass: '!Tb2019Na*'
    },
    supportMailAuth:{
        user: 'support@nspider.io',
	    	pass: '!Tb2019Na*'
    }
}*/