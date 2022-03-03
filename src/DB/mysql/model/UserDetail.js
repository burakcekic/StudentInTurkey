const Sequelize = require('sequelize');
let schema = require('../connection/ormCon');
const table = schema.define("t_user_detail",{
    user_detail_id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id:{
        type:Sequelize.INTEGER
    },
    gender:{
        type: Sequelize.STRING
    },
    birth_date:{
        type: Sequelize.DATE
    }, 
    price_range:{
        type: Sequelize.STRING(100)
    },
    education_level:{
        type:Sequelize.INTEGER
    },
    education_level_preference:{
        type:Sequelize.INTEGER
    },
    citizenship:{
        type:Sequelize.STRING
    }

},{
    tableName:"t_user_detail", // tablo adının sonuna s harfi gelmesini engelliyır
    timestamps: false // createdAt kolon alanı hatasını engellemek için kullanılır
}

);

module.exports = table; 
module.exports.schema = schema;