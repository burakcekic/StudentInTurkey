const fs = require('fs');
const path = require('path');
const fastifyStatic = require('fastify-static');
const routes = require("./routes/routes");
let mongoDal = require("./DB/mongo/mongoDal");
const mongo = require('mongodb');
const generalManager = require("./controller/generalManager"); 
const util = require("./controller/util");

const fastify = require('fastify')({ 
    logger: true, 
    trustProxy: true,  
    ignoreTrailingSlash: true 
});    

fastify.register(
    require('fastify-compress'),
    { global: false },
    
)

fastify.register(fastifyStatic, {// static dosyaların bulunduğu disini ayarlar
    root: path.join(__dirname, '../webmain')
}); 

// api

routes.authRoutes.forEach((route, index) => {
    fastify.route(route);
});

routes.userRoutes.forEach((route, index) => {
    fastify.route(route);
});

routes.mainRoutes.forEach((route, index) => {
    fastify.route(route);
});


// html templates

fastify.get("/",async (request,reply) =>{ 
    const stream = fs.createReadStream('../webmain/pages/index.html');
    reply.type('text/html').send(stream)
}); 

fastify.get("/about-us",async (request,reply) =>{ 
    const stream = fs.createReadStream('../webmain/pages/about.html');
    reply.type('text/html').send(stream)
}); 

fastify.get("/universities",async (request,reply) =>{ 
    const stream = fs.createReadStream('../webmain/pages/universities.html');
    reply.type('text/html').send(stream)
}); 

fastify.get("/university-detail/:q",async (request,reply) =>{ 

    let param = request.query.q;
    const indexName =  new generalManager.YamlManager().getMongoTables()[1];
    let data = await mongoDal.getDataWithCondition(indexName,{uni_id:param});
    
    if(data.length > 0)
    {
        const stream = fs.createReadStream('../webmain/pages/university-detail.html');
        reply.type('text/html').send(stream)
    }
    else reply.redirect("/universities");
}); 

fastify.get("/programs",async (request,reply) =>{ 
    const stream = fs.createReadStream('../webmain/pages/programs.html');
    reply.type('text/html').send(stream)
}); 

fastify.get("/cities",async (request,reply) =>{ 
    const stream = fs.createReadStream('../webmain/pages/cities.html');
    reply.type('text/html').send(stream)
}); 

fastify.get("/city-detail/:q",async (request,reply) =>{ 
    
    const indexName =  new generalManager.YamlManager().getMongoTables()[2];
    var o_id = new mongo.ObjectID(request.query.q);
    let condition = {'_id': o_id};
    let mongoData = await mongoDal.getDataWithCondition(indexName,condition);
    
    if(mongoData.length > 0)
    {
        const stream = fs.createReadStream('../webmain/pages/city-detail.html');
        reply.type('text/html').send(stream)
    }
    else reply.redirect("/cities");
}); 

fastify.get("/edu-sys",async (request,reply) =>{ 
    const stream = fs.createReadStream('../webmain/pages/edu-sys.html');
    reply.type('text/html').send(stream)
}); 

fastify.get("/why-turkey",async (request,reply) =>{ 
    const stream = fs.createReadStream('../webmain/pages/why-turkey.html');
    reply.type('text/html').send(stream)
}); 

fastify.get("/tutorial",async (request,reply) =>{ 
    const stream = fs.createReadStream('../webmain/pages/tutorial.html');
    reply.type('text/html').send(stream)
}); 

fastify.get("/all-fraq",async (request,reply) =>{ 
    const stream = fs.createReadStream('../webmain/pages/all-fraq.html');
    reply.type('text/html').send(stream)
}); 

fastify.get("/students",async (request,reply) =>{ 
    const stream = fs.createReadStream('../webmain/pages/students.html');
    reply.type('text/html').send(stream)
}); 

fastify.get("/contact",async (request,reply) =>{ 
    const stream = fs.createReadStream('../webmain/pages/contact.html');
    reply.type('text/html').send(stream)
}); 

fastify.get("/messages",async (request,reply) =>{ 
    const stream = fs.createReadStream('../webmain/pages/messages.html');
    reply.type('text/html').send(stream)
}); 


fastify.get("/admin/:token",async (request,reply) =>{ 
    const stream = fs.createReadStream('../webmain/pages/index.html');
    reply.type('text/html').send(stream)
}); 



const start = async () => {
    try {
        
        await fastify.listen(8080); //on live 

		fastify.swagger;
        fastify.log.info(`server listening on ${fastify.server.address().port}`)

    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();
