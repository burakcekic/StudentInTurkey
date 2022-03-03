let userResponseData = null; 
let universityDetails = null;

$(document).ready(function(){

    initApi().then(()=>{
        $("#open-forgat-password").click(function(){
            $("#forgatPasswordModal").modal();
        });
        //if(userResponseData != null) initUpdateUserArea();
     
        let val = $("#uni-name").val().toUpperCase();
        let selected = InputSearch(universityDetails,val);
        if(selected.length > 0) initUnivercityArea(selected);
         
        $("#uni-name").keyup(function(e){
            
            if(e.target.value.length >= 3)
            {
                let val = e.target.value;
                let selected = InputSearch(universityDetails,val);
                if(selected.length > 0) initUnivercityArea(selected);
            }
            else initUnivercityArea(universityDetails);
        });

 
        $("#uni-city").change(function(){
            let selectedOpt = $(this).find("option:selected")
            if(selectedOpt.value != "")
            {
                let selectedCity = selectedOpt.text().toUpperCase();
                console.log(selectedCity);
                selectedUni = universityDetails.filter(e => e.uni_detail.city == selectedCity);
                initUnivercityArea(selectedUni);
            }
        });
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

function InputSearch(data,thisVal)
{

	let selected = null;

    selected = data.filter(e => e.uni_detail.uni_name.indexOf(thisVal.toUpperCase()) !== -1); 
    if(selected.length == 0) selected = data;
	return selected;
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

    universityDetails = await getRequestAsyncWitoutHeader(mainPath + "getUniversityDetails");
}