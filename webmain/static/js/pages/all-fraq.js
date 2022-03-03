let fraqResponse = null;

$(document).ready(function(){

    initApi().then(()=>{
        $("#open-forgat-password").click(function(){
            $("#forgatPasswordModal").modal();
        });
        //if(userResponseData != null) initUpdateUserArea();
        initFraq();    
    });
});

function initFraq()
{ 
    let str = "";
    fraqResponse.forEach((e,i) => {
        str += fraqComponent(e["_id"],e.question,e.answer) 
    });
    $("#fraq-list").html(str);
}

async function initApi()
{

    if(pageLoadValidate())
    {
        $("#update-user-area").show();
        let userId = JSON.parse(localStorage.userData)[0].user_id;
        
        fraqResponse = await getRequestAsyncWitoutHeader(mainPath + "getAllFraq");

        userResponseData = await getRequestAsyncWitoutHeader(mainPath + "getUserWithDetail/" +userId , "getUserWithDetail");
        userResponseData = userResponseData.data;
    }
}