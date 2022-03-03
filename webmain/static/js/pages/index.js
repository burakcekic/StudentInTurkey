let userResponseData = null;
let universityDetails = null;
let cities = null;

$(document).ready(function(){

    initApi().then(()=>{
        $("#open-forgat-password").click(function(){
            $("#forgatPasswordModal").modal();
        });
        if(userResponseData != null) initUpdateUserArea();
   
        initUnivercityArea(universityDetails.slice(0,6));
        initCityArea();
    });
});


function initUnivercityArea(data)
{
    let str = "";
    for (let i = 0; i < data.length; i++) 
    { 
        let e = data[i];   
        let id = e.uni_id;
        let name = e.uni_detail.uni_name;
        let website = e.uni_detail.uni_website_url;
        let address = e.uni_detail.uni_contact_information_address;
        let logo = e.uni_detail.uni_logo_url;
        str += universityCardComponent(id,name,website,address,logo);
    }
    $("#uni-area").html(str);
}


function initCityArea()
{
    let str = "";
    for (let i = 0; i < 4; i++) 
    {
        let e = cities[i];
        let img = "/static/template/images/courses/course-1.jpg";
        let text = e.city_description.slice(0,100) + "...";
        str += cityCardComponent(e["_id"],img,e.city,text)
    } 
    $("#city-area").html(str);

}

function cityComponent(id,img,name,text)
{
    return `
    <div class="col-lg-4 col-sm-6 mb-5 mb-lg-0" id = "${id}">
        <div class="card border-0 rounded-0 hover-shadow">
            <div class="card-img position-relative">
                <img class="card-img-top rounded-0" src="${img}" alt="event thumb">
                <div class="card-date"><span>23</span><br>December</div>
            </div>
            <div class="card-body"> 
                <p><i class="ti-location-pin text-primary mr-2"></i>${name}</p>
                <a href="/city-detail/?q=${id}" target="blank">
                    <h4 class="card-title">${text}</h4>
                </a>
            </div>
        </div>
    </div>
    `;
}



// form events
function initUpdateUserArea()
{
    $("#update-name").val(userResponseData.first_name);
    $("#update-lastname").val(userResponseData.last_name);
    $("#update-phone").val(userResponseData.phone);
    $("#update-email").val(userResponseData.email);
    $("#update-birth-date").datepicker();


}

function login()
{
 
    let username = $("input#login-email").val();
    let password = $("input#login-password").val();
    let isRememberMe = $("input#remember").prop('checked');

    if(username.trim() != "" && password.trim() != ""){
        const loginUrl = mainPath + "postLogin";
        let data = {
            username: username,
            password: encrypt(password),
            isRememberMe: isRememberMe
        };
        postRequestAsyncWitoutHeader(loginUrl,data,"postLogin servisi").then(function(response){
            if(response.status == 200 )
            {
                localStorage.userData = JSON.stringify(response.data[0].userData);
                localStorage.token = response.data[0].token;
                window.location.reload();
            }
            else{ 
                toast("error","There was a problem, please try again","Error");
            }
             
            
            
        })
        .catch(function(err){
            console.log(err);
            //toast("error","E-posta ve şifrenizi kontrol ediniz","Hata");
            alert("hata var");
        });

    }



}

function register()
{
    let email = $("#signup-email").val();
    let name = $("#signup-name").val();
    let lastName = $("#signup-name").val();
    let citizenship = $("#signup-citizenship");
    let pass = $("#signup-password").val();
    let passConfrim = $("#signup-password-confrim").val();


    let emailFlag = validateEmail(email,"Lütfen düzgün bir mail giriniz");
    let nameFlag = validateAllLetter(name,"Lütfen düzgün bir isim giriniz");
    let lastNameFlag = validateAllLetter(lastName,"Lütfen düzgün bir soyisim giriniz");
    let citizenshipFlag = valiateCitizenship(citizenship,"Lütfen bir vatandaşlık seçiniz");
    let passFlag = validatePass(pass,"Lütfen düzgün bir şifre giriniz");
    let passConfrimFlag = validatePassConfrim(pass,passConfrim,"şifre ile şifre tekrarı aynı olmalı");

     let flag = emailFlag && 
                nameFlag && 
                lastNameFlag && 
                citizenshipFlag && 
                passFlag && 
                passConfrimFlag;
 
    if(flag)
    {
        let apiData = {
            firstName:name,
            lastName:lastName,
            email:email,
            password: encrypt(pass),
            citizenship:citizenship
        };

        const registerUrl = mainPath + "postRegister";
        postRequestAsyncWitoutHeader(registerUrl,apiData,"postRegister").then(response =>{
            if(response.code == 200) 
            {
                alert("işlem başarılı");
                window.location.href = "/";
 
            }
            else if(response.code == 401) 
            {
                alert("işlem sırasında bi hata oldu");
                //swalWithoutCancel(getLangData("general:SwalInfo"),response.message,"warning",getLangData("Ok"))   
            }
            else 
            {
                alert("sistem çöktü");
                //swalWithoutCancel(getLangData("general:SwalInfo"),getLangData("ApiResposeErrorMessage"),"warning",getLangData("Ok"))   
            }
        });  
    }
    else 
    {
        alert("lütfen formu kriterlere uygun bir şekilde doldurun");
    }

    
}

function update()
{
    let fName = $("#update-name").val();
    let lName = $("#update-lastname").val();
    let phone = $("#update-phone").val();
    let mail = $("#update-email").val();

    let citizenship = $("#signup-citizenship option:selected").text();
    let gender = $("#update-gender option:selected").text();
    let birthDate = $("#update-birth-date").val();
    let educationLevel = $("#update-education-level option:selected").text();
    let educationLevelPreference = $("#update-education-level-preference option:selected").text();
    let pass = $("#update-password").val();

    

    let userData = {
        first_name:fName,
        last_name:lName,
        phone:phone,
        email:mail,
        password:pass
    };

    let userDetailData ={
        gender:gender,
        birth_date:birthDate,
        education_level:educationLevel,
        education_level_preference:educationLevelPreference,
        citizenship:citizenship,
        price_range:priceRange
    };
    let data = {
        set:{
            userData:userData,
            userDetailData:userDetailData
        },
        condition:{userId:localStorage.token}
    }
    postRequestAsyncWitoutHeader(mainPath +"postUserDetail",data,"postUpdateUser servisi")
    .then(res =>{

    });


}
//

// form validation area

// validation area
function validatePass(pass,message)
{ 
    var passes = /^(?=.*[a-zığüşöç])(?=.*[A-ZİĞÜŞÖÇ])(?=.*\d).{8,}$/;
    if(pass.match(passes) && pass.trim() != "")return true;
    else
    {
        //toast("warning",message,getLangData("Warning"));
        return false;
    }
}

function validatePassConfrim(pass,confrim,message)
{ 
    if(pass === confrim)return true;
    else
    {
        //toast("warning",message,getLangData("Warning"));
        return false;
    }
}

function validateAllLetter(name,message)
{
    
    var letters = /^[a-zA-ZığüşöçİĞÜŞÖÇ]+$/;
    if(name.match(letters)) return true;
    else
    {
        //toast("warning",message,getLangData("Warning"));
        return false;
    }
  
}

function validateEmail(email,message)
{
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(email.match(mailformat))return true;
    else
    {
        //toast("warning",message,getLangData("Warning"));
        return false;
    }
}

function allNumeric(num,message)
{ 
    var numbers = /^[0-9]+$/;
    if(num.match(numbers)) return true;
    else
    {
        //toast("warning",message,getLangData("Warning"));
        return false;
    }
}

function validateTel(telnum,message)
{ 
    var numbers = /0\d{10}/;
    var numbers2 = /5\d{9}/;
    if( (telnum.match(numbers) && telnum.length < 12 ) || (telnum.match(numbers2) && telnum.length < 11) )return true;
    else
    {
        //toast("warning",message,getLangData("Warning"));
        return false;
    }
}

function valiateCitizenship(val,message)
{
    if(val.find("option:selected").attr("data-value") != "") return true;
    else 
    {
        //toast("warning",message,getLangData("Warning"));
        return false;
    }
}
//


async function initApi()
{

    if(pageLoadValidate())
    {
        $("#update-user-area").show();
        let userId = JSON.parse(localStorage.userData)[0].user_id;
        
        universityDetails = await getRequestAsyncWitoutHeader(mainPath + "getUniversityDetails");
        cities = await getRequestAsyncWitoutHeader(mainPath + "getCities"); 

        userResponseData = await getRequestAsyncWitoutHeader(mainPath + "getUserWithDetail/" +userId , "getUserWithDetail");
        userResponseData = userResponseData.data;
    }
}