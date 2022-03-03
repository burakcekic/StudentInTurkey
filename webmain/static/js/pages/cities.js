let universities = null;
let userResponseData = null;
let cities = null;

$(document).ready(function(){

    initApi().then(()=>{
        $("#open-forgat-password").click(function(){
            $("#forgatPasswordModal").modal();
        });
        //if(userResponseData != null) initUpdateUserArea();
   
        initCityArea(); 
    });
});
 


function initCityArea()
{
    let str = "";
    for (let i = 0; i < cities.length; i++) 
    {
        let e = cities[i];
        let img = "/static/template/images/courses/course-1.jpg";
        let text = e.city_description.slice(0,100) + "...";
        str += cityCardComponent(e["_id"],img,e.city,text)
    } 
    $("#city-area").html(str);

}



 
async function initApi()
{

    if(pageLoadValidate())
    {
        $("#update-user-area").show();
        let userId = JSON.parse(localStorage.userData)[0].user_id;
        
        cities = await getRequestAsyncWitoutHeader(mainPath + "getCities"); 

        userResponseData = await getRequestAsyncWitoutHeader(mainPath + "getUserWithDetail/" +userId , "getUserWithDetail");
        userResponseData = userResponseData.data;


    }
}