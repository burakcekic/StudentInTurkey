let userResponseData = null; 
let selectedUniversity = null;
let universityDetail = null;


$(document).ready(function(){

    initApi().then(()=>{
        $("#open-forgat-password").click(function(){
            $("#forgatPasswordModal").modal();
        });
        initPage();
    });
});

function initPage()
{
    $("[data-id='uni-name']").html(selectedUniversity.uni_detail.uni_name);
    $("[data-id='uni-website-url']").html(selectedUniversity.uni_detail.uni_website_url);
    $("[data-id='uni_contact_information_mail']").html(selectedUniversity.uni_detail.uni_contact_information_mail);
    $("[data-id='uni_contact_information_address']").html(selectedUniversity.uni_detail.uni_contact_information_address);
    $("[data-id='uni_contact_information_phone']").html(selectedUniversity.uni_detail.uni_contact_information_phone);
    $("[data-id='uni-logo").attr("src",selectedUniversity.uni_detail.uni_logo_url);
    $("[data-id='fb").attr("href",selectedUniversity.uni_social_media_url.facebook);
    $("[data-id='twt").attr("href",selectedUniversity.uni_social_media_url.twitter);
    $("[data-id='ins").attr("href",selectedUniversity.uni_social_media_url.instagram);
    

    //program area
    let undergraduate_degree_program = selectedUniversity.programs.undergraduate_degree_program;
    let associate_degree_program = selectedUniversity.programs.associate_degree_program;
    let masters_program = selectedUniversity.programs.masters_program;
    let phd_program = selectedUniversity.programs.phd_program;

    $("#undergraduate_degree_program .count").html((undergraduate_degree_program != null && undergraduate_degree_program != NaN && undergraduate_degree_program != "")?undergraduate_degree_program:"0");
    $("#associate_degree_program .count").html((associate_degree_program != null && associate_degree_program != NaN && associate_degree_program != "")?associate_degree_program:"0");
    $("#masters_program .count").html((masters_program != null && masters_program != NaN && masters_program != "")?masters_program:"0");
    $("#phd_program .count").html((phd_program != null && phd_program != NaN && phd_program != "")?phd_program:"0");

    //number area
    let undergraduate_degree_program_students = selectedUniversity.numberofstudents_program.undergraduate_degree_program_students;
    let associate_degree_program_students = selectedUniversity.numberofstudents_program.associate_degree_program_students;
    let masters_program_students = selectedUniversity.numberofstudents_program.masters_program_students;
    let phd_program_students = selectedUniversity.numberofstudents_program.phd_program_students;

    $("#undergraduate_degree_program_students .count").html((undergraduate_degree_program_students != null && undergraduate_degree_program_students != NaN && undergraduate_degree_program_students != "")?undergraduate_degree_program_students:"0");
    $("#associate_degree_program_students .count").html((associate_degree_program_students != null && associate_degree_program_students != NaN && associate_degree_program_students != "")?undergraduate_degree_program_students:"0");
    $("#masters_program_students .count").html((masters_program_students != null && masters_program_students != NaN && masters_program_students != "")?masters_program_students:"0");
    $("#phd_program_students .count").html((phd_program_students != null && phd_program_students != NaN && phd_program_students != "")?phd_program_students:"0"); 

    
    //uni_opportunities area
    let sports_facilities = selectedUniversity.uni_opportunities.sports_facilities;
    let sports_team = selectedUniversity.uni_opportunities.sports_team;
    let student_associations = selectedUniversity.uni_opportunities.student_associations;
    let laboratories = selectedUniversity.uni_opportunities.laboratories;
    let area = selectedUniversity.uni_opportunities.area;
    let dormitory = selectedUniversity.uni_opportunities.dormitory_capacity;

    $("#sports_facilities .count").html((sports_facilities != null && sports_facilities != NaN && sports_facilities != "")?sports_facilities:"0");
    $("#sports_team .count").html((sports_team != null && sports_team != NaN && sports_team != "")?sports_team:"0");
    $("#student_associations .count").html((student_associations != null && student_associations != NaN && student_associations != "")?student_associations:"0");
    $("#dormitory_capacity .count").html((dormitory != null && dormitory != NaN && dormitory != "")?dormitory:"0");
    $("#laboratories .count").html((laboratories != null && laboratories != NaN && laboratories != "")?laboratories:"0");
    $("#area .count").html((area != null && area != NaN && area != "")?area:"0");
 
    //human_resources area
    let total_teaching_stuff = selectedUniversity.human_resources.total_teaching_stuff;
    let instructor = selectedUniversity.human_resources.instructor;
    let associate_program = selectedUniversity.human_resources.associate_program;
    let research_assistant = selectedUniversity.human_resources.research_assistant;
    let professor = selectedUniversity.human_resources.professor;
    let foreign_academician = selectedUniversity.human_resources.foreign_academician;
    let doctor_faculty_member = selectedUniversity.human_resources.doctor_faculty_member;

    $("#total_teaching_stuff .count").html((total_teaching_stuff != null && total_teaching_stuff != NaN && total_teaching_stuff != "")?total_teaching_stuff:"0");
    $("#instructor .count").html((instructor != null && instructor != NaN && instructor != "")?instructor:"0");
    $("#associate_program .count").html((associate_program != null && associate_program != NaN && associate_program != "")?associate_program:"0");
    $("#research_assistant .count").html((research_assistant != null && research_assistant != NaN && research_assistant != "")?research_assistant:"0");
    $("#professor .count").html((professor != null && professor != NaN && professor != "")?professor:"0");
    $("#foreign_academician .count").html((foreign_academician != null && foreign_academician != NaN && foreign_academician != "")?foreign_academician:"0");
    $("#doctor_faculty_member .count").html((doctor_faculty_member != null && doctor_faculty_member != NaN && doctor_faculty_member != "")?doctor_faculty_member:"0");
}

 
async function initApi()
{

    if(pageLoadValidate())
    {
        $("#update-user-area").show();
        let userId = JSON.parse(localStorage.userData)[0].user_id;
        
        userResponseData = await getRequestAsyncWitoutHeader(mainPath + "getUserWithDetail/" +userId, "getUserWithDetail");
        userResponseData = userResponseData.data;
    }
    
    universityDetail = await getRequestAsyncWitoutHeader(mainPath + "getUniversityDetails");
     
    let paramData = getJsonWithCondition({uni_id:getParameterInUrlByQuery("q")},universityDetail);
    if(paramData.length > 0) selectedUniversity = selectedUniversity = paramData[0];
    else window.location.href = "/universities";
}