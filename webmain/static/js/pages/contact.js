$(document).ready(function(){

});
function sendMessage()
{
    let name = $("#name").val();
    let mail = $("#mail").val();
    let subject = $("#subject").val();
    let message = $("#message").val();

    if(name != "" && mail != "" && subject != "" && message != "") 
    {

    }
    else toast("warning","please enter form elements","warning");
}