// http

async function getRequestAsync(link, root)
{
    let refreshToken = (localStorage.getItem("refreshToken") != null && checkTokenTime()) ? localStorage.getItem("refreshToken") :"";
    //let refreshToken = localStorage.getItem("refreshToken");
    var response = await $.ajax({
        url:link,
        method: "GET",
        async:true,
        cache :false,
        timeout:30000,
        headers:{
            "RefreshToken":refreshToken,
            "Authorization": getToken(),
            "Cache-Control": "no-cache",
            "Cache-Control": "no-store",
            "Pragma": "no-cache"
        },
        success: function (data,textstatus,response)
        {
            let token = response.getResponseHeader("Token");
            let refreshToken = response.getResponseHeader("RefreshToken");

            localStorage.setItem("token",token);
            localStorage.setItem("refreshToken",refreshToken);
            localStorage.setItem("createdDate",new Date().toString());// üretilen token saati client side da atanır
            if(token == null || refreshToken == null) window.location.href = "/";

        },
        error: function (requset,status,error) {
            if(status=="timeout"){
                toast("warning","Zaman aşımı hatası lütfen tekrar deneyin","Uyarı");
            }
            else{
                console.log(requset);
                console.log(error);
                console.log(root);
            }

        }
    }) ;
    return response;
}

async function postRequestAsync(link,data,root)
{
    let refreshToken = (localStorage.getItem("refreshToken") != null && checkTokenTime()) ? localStorage.getItem("refreshToken") :"";
    var request = $.ajax({
        url:link,
        method: "POST",
        async:true,
        cache :false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers:{
            "RefreshToken":refreshToken,
            "Authorization":getToken(),
            "Cache-Control": "no-cache",
            "Cache-Control": "no-store",
            "Pragma": "no-cache"
            //Content-Encoding":"gzip"
            //"Accept-Encoding":" compress, gzip",
            //"Accept-Encoding":"",
            //"Accept-Encoding":" *",
            //"Accept-Encoding":" compress;q=0.5, gzip;q=1.0",
            //"Accept-Encoding":" gzip;q=1.0, identity; q=0.5, *;q=0"
        },
        data:JSON.stringify(data),
        timeout: 900000,
        success: function (data,textstatus,response)
        {
            let token = response.getResponseHeader("Token");
            let refreshToken = response.getResponseHeader("RefreshToken");

            localStorage.setItem("token",token);
            localStorage.setItem("refreshToken",refreshToken);
            localStorage.setItem("createdDate",new Date().toString());// üretilen token saati client side da atanır
            if(token == null || refreshToken == null) window.location.href = "/";
        },
        error: function (requset,status,error) {
            if(status=="timeout"){
                toast("warning","Zaman aşımı hatası lütfen tekrar deneyin","Uyarı");
            }
            else{
                console.log(requset);
                console.log(error);
                console.log(root);
            }
        }
    });

    return request;
}

async function postRequestAsyncForFile(link,data,root)
{
    let refreshToken = (localStorage.getItem("refreshToken") != null && checkTokenTime()) ? localStorage.getItem("refreshToken") :"";
    var request = $.ajax({
        url:link,
        method: "POST",
        async:true,
        processData: false, // for file
        contentType: false, // for file
        headers:{
            "RefreshToken":refreshToken,
            "Authorization":getToken(),
            "Cache-Control": "no-cache",
            "Cache-Control": "no-store",
            "Pragma": "no-cache"
  
        },
        data:data,
        timeout: 600000,
        success: function (data,textstatus,response)
        {
            let token = response.getResponseHeader("Token");
            let refreshToken = response.getResponseHeader("RefreshToken");

            localStorage.setItem("token",token);
            localStorage.setItem("refreshToken",refreshToken);
            localStorage.setItem("createdDate",new Date().toString());// üretilen token saati client side da atanır
            if(token == null || refreshToken == null) window.location.href = "/";
        },
        error: function (requset,status,error) {
            if(status=="timeout"){
                toast("warning","Zaman aşımı hatası lütfen tekrar deneyin","Uyarı");
            }
            else{
                console.log(requset);
                console.log(error);
                console.log(root);
            }
        }
    });

    return request;
}

async function getRequestAsyncWitoutHeader(link,root)
{
    var request = $.ajax({
        url:link,
        method: "GET",
        async:true,
        cache :false,
        timeout: 30000,
        success: function (data,textstatus,response)
        {

        },
        error: function (requset,status,error) {
            if(status=="timeout"){
                toast("warning","Zaman aşımı hatası lütfen tekrar deneyin","Uyarı");
            }
            else{
                console.log(requset);
                console.log(error);
                console.log(root);
            }
        }
    });

    return request;
}

async function postRequestAsyncWitoutHeader(link,data,root)
{
    var request = $.ajax({
        url:link,
        method: "POST",
        async:true,
        cache :false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data:JSON.stringify(data),
        timeout: 40000,
        success: function (data)
        {
        },
        error: function (requset,status,error) {
            if(status=="timeout"){
                toast("warning","Zaman aşımı hatası lütfen tekrar deneyin","Uyarı");
            }
            else{
                console.log(requset);
                console.log(error);
                console.log(root);
            }
        }
    });

    return request;
}

async function pageLoadValidate()
{
    let token = localStorage.token;
    if(token != null && token != undefined && token != "")
    {
        let res = await postRequestAsyncWitoutHeader(mainPath + "postUserValidate",{token:localStorage.token});
        if(res.validate == true) return true;
        else return false;
    }
    else return false;
}
//

// json set
function findValueInJson(key,value,obj)
{
    return  obj.filter(
        function(data){
            return data[key] == value;
        });
}

function getJsonWithCondition(set, obj)
{
    let result = obj.filter(function(item) {
        for (var key in set) {
          if (item[key] === undefined || item[key] != set[key])
            return false;
        }
        return true;
      });
    
      return result;
}

function getJsonWithOrCondition(set, obj)
{
    
    let result = obj.filter(function(item) {

        for (var key in set) 
        {
            for (let i = 0; i < set[key].length; i++) 
            {
                const e = set[key][i];
                if (item[key] !== undefined && item[key] == e) return true;
            }
        }
    });

    return result;
}

let objectIsEmpty = (obj) => Object.keys(obj).length === 0 && obj.constructor === Object;

//



// popups

function toast(type,message,header)
{
    toastr[type](message, header, {
        positionClass: 'toast-top-right',
        preventDuplicates: true,
        closeButton:true,
    });
}

function swal(title,text,icon,cancelBtnText,confrimBtnText)

{

    return Swal.fire({
        title: title,
        text: text,
        icon: icon,
        showCancelButton: true,
        cancelButtonText: cancelBtnText,   
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: confrimBtnText
        })
}

function swalWithoutCancel(title,text,icon,confrimBtnText)
{
    return Swal.fire({
        title: title,
        text: text,
        icon: icon,
        showCancelButton: false, 
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: confrimBtnText
    })
}

function swalWithHtml(title,html,icon,className,cancelBtnText,confrimBtnText)
{
    return Swal.fire({
        title: title,
        html: html,
        icon: icon,
        showCancelButton: true,
        cancelButtonText: cancelBtnText,   
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: confrimBtnText,
        customClass: className,
        })
}
//



// tokenize
function getToken(){
    if(!checkTokenTime())localStorage.setItem("token","null");
    if(localStorage.getItem("token") != null && localStorage.getItem("token") != null) return "Bearer " + localStorage.getItem("token");
}

function checkTokenTime()
{
    if (localStorage.getItem("createdDate") != null) {
        var createdDate = new Date(localStorage.getItem("createdDate"));
        var now = new Date();
        var difference = now.getTime() - createdDate.getTime();
        var resultInMinutes = Math.round(difference / 60000);
        return resultInMinutes < 60;
    }
    else {
        return true;
    }
}

function pageLoadControl()
{
    const customerName = localStorage.getItem("customerName");
    const customerId = localStorage.getItem("customerId");
    const customerStatus = localStorage.getItem("customerStatus");
    const customerRole = localStorage.getItem("customerRole"); 

    const slToken = localStorage.getItem("token");
    const lsRefreshToken = localStorage.getItem("refreshToken");
    
    if(customerId == undefined || customerStatus != 0)logoutClick();
    if((slToken == null || slToken == "null") && (lsRefreshToken == null || lsRefreshToken == "null") ) logoutClick();
    return {customerId:customerId,customerName:customerName,customerRole:customerRole,customerStatus:customerStatus}

}

function logoutClick(isRefresh = true)
{
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("registerToken");
    localStorage.removeItem("createdDate");
    //kullanıcı 
    
    if(isRefresh) window.location.href = "/";
    
}
//


// decode - encode

function decrypt(val) {
    let keyStr = "ABCDEFGHIJKLMNOP" +
        "QRSTUVWXYZabcdef" +
        "ghijklmnopqrstuv" +
        "wxyz0123456789+/" +
        "=";
 
    var output = "";
 
    var i = 0;   
    val = val.replace("/[^ A - Za - z0 - 9\+\/\=] / g", "");    
    do {
        var enc1 = keyStr.indexOf(val[i++]);
        var enc2 = keyStr.indexOf(val[i++]);
        var enc3 = keyStr.indexOf(val[i++]);
        var enc4 = keyStr.indexOf(val[i++]);
 
        var chr1 = (enc1 << 2) | (enc2 >> 4);
        var chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        var chr3 = ((enc3 & 3) << 6) | enc4;
 
        output = output + String.fromCharCode(chr1);
        if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
        }
        chr1 = chr2 = chr3 = null;
        enc1 = enc2 = enc3 = enc4 = null;
    } while (i < val.length);    
    output = unescape(output);    
    var pattern = new RegExp("[|]");
    output = output.replace(pattern, "+");
    return output;
}

function encrypt(val) 
{
 
    let keyStr = "ABCDEFGHIJKLMNOP" +
        "QRSTUVWXYZabcdef" +
        "ghijklmnopqrstuv" +
        "wxyz0123456789+/" +
        "=";

    val = val.split('+').join('|');
    //let input = escape(password);
    /* let input = password; */
    let input = encodeURI(val);
    let output = "";
    let chr1, chr2, chr3;
    let enc1, enc2, enc3, enc4;
    let i = 0;

    do {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;

        }
        output = output +
            keyStr.charAt(enc1) +
            keyStr.charAt(enc2) +
            keyStr.charAt(enc3) +
            keyStr.charAt(enc4);
        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";
    } while (i < input.length); 
    return output;
}

let decodeSelectedId = function(selectedId)
{
    //selectedId = CryptoJS.AES.decrypt(selectedId.split('xMl3Jk').join('+').split("Por21Ld").join("/").split("Ml32").join("="),JSON.parse(decrypt(new AppConfig().getConfigJson())).deviceId).toString(CryptoJS.enc.Utf8);
    selectedId = CryptoJS.AES.decrypt(selectedId.split('xMl3Jk').join('+').split("Por21Ld").join("/").split("Ml32").join("="),decrypt(localStorage.decodeConfig)).toString(CryptoJS.enc.Utf8);
    return selectedId;
}

let encodeSelectedId = function(selectedId)
{
    //selectedId = CryptoJS.AES.encrypt(selectedId,JSON.parse(decrypt(new AppConfig().getConfigJson())).deviceId).toString().replaceAll('+',"xMl3Jk").replaceAll("/","Por21Ld").replaceAll("=","Ml32");
    selectedId = CryptoJS.AES.encrypt(selectedId,decrypt(localStorage.decodeConfig)).toString().replaceAll('+',"xMl3Jk").replaceAll("/","Por21Ld").replaceAll("=","Ml32");
    return selectedId;
}

function encodeVal(val)
{
    val = CryptoJS.AES.encrypt(val,decrypt(localStorage.decodeConfig)).toString();
    return val;
}

//
function strToArr(val)
{
    return val.replace("[","").replace("]","").split(",");
}

function getParameterInUrlByQuery(name) //sayfa url'ini parçalar. Böylece url ile gönderilen veri alınabilinir
{
    name=name.toLowerCase();
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href.toLowerCase());
    if (results == null)
        return "";
    else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
}

function getRandomColor() 
{
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

async function selectAvailable(date) 
{
    let data = localStorage.getItem("availableDateResponse");
    if(data != undefined && data != null) new GetApiData(customerId).getAvailableDates();
    data = JSON.parse(data);

    var availableDates = data;
    for(let i = 0; i < availableDates.length; i++)
    {
        availableDates[i] = new DateConverter(availableDates[i],"yyyy-mm-dd").shortTrDateFormat();
    }
    dmy = date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear();
    if ($.inArray(dmy, availableDates) != -1)return true;
    else return false

}

function mailControl(email)
{
  var kontrol = new RegExp(/^[^0-9][a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[@][a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,4}$/i);
  return kontrol.test(email);
}


function createUUID() // benzersiz id üretir
{
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
	reader.readAsText(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});


function csvToArray(str, delimiter = ",") 
{
	const headers = str.slice(0, str.indexOf("\n")).split("\r")[0].split(delimiter);
	
	let rows = str.slice(str.indexOf("\n") + 1).split("\n");
	rows = rows.map(row => row.replace("\r",""));

	
	const arr = rows.map(function (row) {
		const values = row.split(delimiter);
		const el = headers.reduce(function (object, header, index) {
		object[header] = values[index];
		return object;
		}, {});
		return el;
	});

  return arr;
}


const mainPath = "/api/";
