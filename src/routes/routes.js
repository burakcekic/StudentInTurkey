const authController = require("./authController");
const userController = require("./userController");
const mainController = require("./mainController");
const tools = require("./tools");
const mainPath = "/api";

/*
    tüm apilerin url bağlantıları burdadır. her bir arraylistteki url ' göre metodları ayrılmıştır
*/



const authRoutes = [
    {
        method: 'POST',
        url: mainPath  + "/postLogin",
        handler:  authController.postLogin
    },
    {
        method: 'POST',
        url: mainPath  + "/postRegister",
        handler:  authController.postRegister
    },
    {
        method: 'POST',
        url: mainPath  + "/postForgatPass",
        preHandler:tools.tokenValidate,
        handler:  authController.postForgatPass  
    },
    {
        method: 'POST',
        url: mainPath  + "/postUserDetail",
        preHandler:tools.tokenValidate,
        handler:  authController.postUserDetail  
    },
    {
        method: 'POST',
        url: mainPath  + "/homepageContactMail",
        handler:  authController.homepageContactMail
    }
];

const userRoutes = [
    {
        method: 'POST',
        url: mainPath  + "/postUserValidate",
        handler:  userController.postUserValidate
    },
    {
        method: 'GET',
        url: mainPath  + "/getUserWithDetail/:userId",
        handler:  userController.getUserWithDetail
    } 
]

const mainRoutes = [
    {
        method: 'GET',
        url: mainPath  + "/getUnivercityPrograms",
        handler:  mainController.getUnivercityPrograms
    },
    {
        method: 'GET',
        url: mainPath  + "/getUniversities",
        handler:  mainController.getUniversities
    },
    {
        method: 'GET',
        url: mainPath  + "/getUniversityDetails",
        handler:  mainController.getUniversityDetails
    },
    {
        method: 'GET',
        url: mainPath  + "/getCities",
        handler:  mainController.getCities
    }  ,
    {
        method: 'GET',
        url: mainPath  + "/getAllFraq",
        handler:  mainController.getAllFraq
    }  
]

module.exports.authRoutes = authRoutes;
module.exports.userRoutes = userRoutes;
module.exports.mainRoutes = mainRoutes;