const Sequelize = require('sequelize');
let schema = require('../connection/ormCon');
const table = schema.define("t_user",{
    user_id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    first_name:{
        type: Sequelize.STRING
    },
    last_name:{
        type: Sequelize.STRING
    },
    email:{
        type: Sequelize.STRING
    },
    phone:{
        type: Sequelize.STRING
    },
    password:{
        type: Sequelize.STRING(100)
    },
    role:{
        type:Sequelize.INTEGER
    },
    status:{
        type:Sequelize.INTEGER
    },
    create_date:{
        type:Sequelize.DATE,
        defaultValue:Sequelize.NOW
    }

},{
    tableName:"t_user", // tablo adının sonuna s harfi gelmesini engelliyır
    timestamps: false // createdAt kolon alanı hatasını engellemek için kullanılır
}

);

module.exports = table; 
module.exports.schema = schema;