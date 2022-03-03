let userResponseData = null;
let selectedCity = null;
let universityDetails = null;


$(document).ready(function(){

    initApi().then(()=>{
        $("#open-forgat-password").click(function(){
            $("#forgatPasswordModal").modal();
        });
        initPage();

        initUnivercityArea();
 
    });
});
function initPage()
{
    $("[data-id='city-name']").html(selectedCity.city);
    $("[data-id='city-detail']").html(selectedCity.city_description);
    $("[data-id='city-universities']").html(selectedCity.universities);
    $("[data-id='city-libraries']").html(selectedCity.libraries);
    $("[data-id='city-museums']").html(selectedCity.museums);
    $("[data-id='city-population']").html(selectedCity.population);
    $("[data-id='city-railway-station']").html(selectedCity.railway_station);
    
}

function initUnivercityArea()
{ 
    let city = selectedCity.city; 
    selectedUni = universityDetails.filter(e => e.uni_detail.city == city);


    
    let str = "";
    for (let i = 0; i < selectedUni.length; i++) 
    {   
        let e = selectedUni[i];    
        let id = e.uni_id;
        let name = e.uni_detail.uni_name;
        let website = e.uni_detail.uni_website_url;
        let address = e.uni_detail.uni_contact_information_address;
        let logo = e.uni_detail.uni_logo_url;
        str += universityCardComponent(id,name,website,address,logo); 
    }
    $("#uni-area").html(str);
}

 
async function initApi()
{

    if(pageLoadValidate())
    {
        $("#update-user-area").show();
        let userId = JSON.parse(localStorage.userData)[0].user_id;
        
        userResponseData = await getRequestAsyncWitoutHeader(mainPath + "getUserWithDetail/" +userId , "getUserWithDetail");
        userResponseData = userResponseData.data;
    } 
    cities = await getRequestAsyncWitoutHeader(mainPath + "getCities");
    universityDetails = await getRequestAsyncWitoutHeader(mainPath + "getUniversityDetails");

    let paramData = getJsonWithCondition({"_id":getParameterInUrlByQuery("q")},cities);
    if(paramData.length > 0) selectedCity = paramData[0];
    else window.location.href = "/cities";
    
}