let userResponseData = null;
let universityPrograms = null;
let openedPrograms = null;
let universityDetails = null;

$(document).ready(function(){

    initApi().then(()=>{
        $("#open-forgat-password").click(function(){
            $("#forgatPasswordModal").modal();
        });
        //if(userResponseData != null) initUpdateUserArea();

        initFilterArea();

    });
});

function initFilterArea()
{
    // uni area
    let uniNameList = universityPrograms.map(e=> e.university_name);
    let uniStr = '<option value="">please select university</option>';
    uniNameList.forEach(e => {
        uniStr += '<option value="'+e+'">'+e+'</option>';
    });
    $("#uni-name").html(uniStr); 

    // study lang 
    let studyLanguage = new Set();
    universityPrograms.forEach(e => {
        e.programs.forEach(element =>  studyLanguage.add(element.study_language));
    });
    studyLanguage = Array.from(studyLanguage);
    
    let langStr = '<option value="">please select Language</option>';
    studyLanguage.forEach(e => {
        langStr += '<option value="'+e+'">'+e+'</option>';
    }); 
    $("#lenguage").html(langStr);
}

function filterPrograms()
{
    let programName = $("#program-name").val();
    let uniName = $("#uni-name option:Selected").attr("value");
    let uniCity = $("#uni-city option:Selected").text();
    let studyType = $("#study-type option:Selected").attr("value");
    let eduLevel = $("#edu-level option:Selected").attr("value");
    let lenguage = $("#lenguage option:Selected").attr("value");

    let condition = {};
    if(programName != "" && programName != undefined)condition.programName = programName;
    if(uniName != "" && uniName != undefined)condition.uniName = uniName;
    if(uniCity != "" && uniCity != undefined && uniCity != "please select city")condition.uniCity = uniCity;
    if(studyType != "" && studyType != undefined)condition.studyType = studyType;
    if(eduLevel != "" && eduLevel != undefined)condition.eduLevel = eduLevel;
    if(lenguage != "" && lenguage != undefined)condition.lenguage = lenguage;

    console.log(condition);
    let selectedData = [];
    if(Object.keys(condition).length > 0)
    {
        if(condition.hasOwnProperty("programName"))
        {
            let selected = openedPrograms.filter(e => e.programName.indexOf(condition.programName.toUpperCase()) !== -1); 
            let newCondition = condition;
            delete newCondition.programName;
            selectedData = getJsonWithCondition(newCondition,selected);
        }
        else selectedData = getJsonWithCondition(condition,openedPrograms);
    }
    else selectedData = openedPrograms; 
    
    if(selectedData.length == 0) toast("warning","There is no program in the filter you selected","Warning");
    

    initPager(selectedData);
    pushHtml(selectedData.slice(0,20));

}

function pushHtml(data)
{ 
    let str = "";
    data.forEach((e,i) => { 
        let selectedUni = universityDetails.filter(el=> el.uni_detail.uni_name == e.uniName);
        if(selectedUni.length > 0)
        {
            let uniId = selectedUni[0].uni_id;
            str += programComponent(i,e.uniName,uniId,e.programName,e.uniCity,e.eduLevel,e.studyType,e.lenguage) 
        }
    });
    $("#prog-list").html(str);
}

function initPager(data)
{
    $(".pagerArea").show();
    if(data.length < 100)
    {
        
        $(".pagerArea ul.pagination").empty();
        let str  = '';
            str += '<li class="page-item"><a class="page-link" name="prev"  data-lang="prev" href="#">Prev</a></li>';
            str += '<li class="page-item"><a class="page-link" name="first" data-lang="first" href="#">First</a></li>';
            str += '<li class="page-item num_li active"><a class="page-link" name="page_num" value="val_1" href="#">1</a></li>';

            let pageCount = Math.floor(data.length / 20);
            for(let i = 2; i <= pageCount + 1; i ++)
            {
                str += '<li class="page-item num_li"><a class="page-link" name="page_num" value="val_'+i+'" href="#">'+i+'</a></li>';
            } 
            str += '<li class="page-item"><a class="page-link" name="next"href="#" data-lang="next">Next</a></li>';
        
        $(".pagerArea ul.pagination").html(str);
    }

    $(".pagerArea ul li a").click(function(){ 
        setPager(this,data);
    });
}

function setPager(thisEl,selectedData)
{
    const pageLimit = 20;
    let type = $(thisEl).attr("name");
    if(type == "first")
    { 
        pushHtml(selectedData.slice(0,20));
        let str  = '';
            str += '<li class="page-item"><a class="page-link" name="prev" href="javascript:void(0)">Geri</a></li>';
            str += '<li class="page-item"><a class="page-link" name="first" href="javascript:void(0)">İlk</a></li>';
            str += '<li class="page-item num_li active"><a class="page-link" name="page_num" value="val_1" href="#">1</a></li>';
            str += '<li class="page-item num_li"><a class="page-link" name="page_num" value="val_2" href="#">2</a></li>';
            str += '<li class="page-item num_li"><a class="page-link" name="page_num" value="val_3" href="#">3</a></li>';
            str += '<li class="page-item num_li"><a class="page-link" name="page_num" value="val_4" href="#">4</a></li>';
            str += '<li class="page-item num_li"><a class="page-link" name="page_num" value="val_5" href="#">5</a></li>';
            str += '<li class="page-item"><a class="page-link" name="icon">...</a></li>';
            str += '<li class="page-item"><a class="page-link" name="next"href="#">İleri</a></li>';
        $(".pagerArea ul").html(str);
      
        $(".pagerArea ul li a").click(function(){
            setPager(this);
        });
    }
    else if(type == "page_num")
    { 
        let thisNum = parseInt($(thisEl).attr("value").replace("val_",""));
        let index = pageLimit * thisNum;
        
        pushHtml(selectedData.slice(index,index + pageLimit));
        $(".pagerArea ul li").removeClass("active");
        $(thisEl).parents("li").addClass("active");
    }
    else if(type == "prev")
    { 
    
        let pagination = $(".pagerArea ul");
        let pageList = $(".pagerArea ul li.num_li");

        let selectedPage = pagination.find("li.active a");
        let firstPage = $(pageList[0]).find("a");

        if(selectedPage.text() == firstPage.text())
        {
            if(selectedPage.text() != 1)
            {
                let pageLinks = $(".pagerArea ul li a[name='page_num']");
            
                if(pageLinks.length < 5)
                {
    
                    let lastEl = pageLinks[pageLinks.length -2];
                    let lastElText = parseInt($(lastEl).text());
     
                    
                    pushHtml(selectedData.slice(0, pageLimit));
                    let newStr  = '';
                        newStr += '<li class="page-item"><a class="page-link" name="prev" href="#">Geri</a></li>';
                        newStr += '<li class="page-item"><a class="page-link" name="first" href="#">İlk</a></li>';
                        newStr += '<li class="page-item num_li"><a class="page-link" name="page_num" value="val_'+(lastElText - 4)+'" href="#">'+(lastElText - 4)+'</a></li>';
                        newStr += '<li class="page-item num_li"><a class="page-link" name="page_num" value="val_'+(lastElText - 3)+'" href="#">'+(lastElText - 3)+'</a></li>';
                        newStr += '<li class="page-item num_li"><a class="page-link" name="page_num" value="val_'+(lastElText - 2)+'" href="#">'+(lastElText - 2)+'</a></li>';
                        newStr += '<li class="page-item num_li"><a class="page-link" name="page_num" value="val_'+(lastElText - 1)+'" href="#">'+(lastElText - 1)+'</a></li>';
                        newStr += '<li class="page-item num_li active"><a class="page-link" name="page_num" value="val_'+lastElText+'" href="#">'+lastElText+'</a></li>';
                        //newStr += '<li class="page-item"><a class="page-link" name="icon">...</a></li>';
                        newStr += '<li class="page-item"><a class="page-link" name="next"href="#">İleri</a></li>';
                    
                    $(".pagerArea ul").html(newStr);
    
                    $(".pagerArea ul li a").click(function(){
                      setPager(this);
                    });
                }
                else
                {
                    for(let i = 0; i < pageLinks.length; i ++)
                    {
                        let e = pageLinks[i];
                        let aText = parseInt($(e).text());
                        let newNum = aText - 4;
                        if(newNum > 0)
                        {
                        $(e).text(newNum);
                        $(e).attr("value","val_"+ newNum);
                        }
        
                    }
                    $(".pagerArea ul li").removeClass("active");
                    $(pageLinks[4]).parents("li").addClass("active");
                }
            }
        }
        else 
        {
            let newActive = selectedPage.parents("li").prev();
            let thisNum = $(newActive).find("a").attr("value").replace("val_","");
            
            let index = pageLimit * thisNum;
            pushHtml(selectedData.slice(index-20, index));

            $(".pagerArea ul li").removeClass("active");
            newActive.addClass("active");
        }
    }
    else if(type == "next")
    { 
        let pagination = $(".pagerArea ul");
        let pageList = $(".pagerArea ul li.num_li");

        let selectedPage = pagination.find("li.active a");
        if(parseInt(selectedPage.text()) < Math.floor(selectedData.length / 20)) // limiti aşmadıysa
        {
            let lastPage = $(pageList[pageList.length -1]).find("a");
        
            if(selectedPage.text() == lastPage.text())
            {
    
                let pageLinks = $(".pagerArea ul li a[name='page_num']");
                for(let i = 0; i < pageLinks.length; i ++)
                {
                    let e = pageLinks[i];
                    let aText = parseInt($(e).text());
                    let newNum = aText + 4;
    
                    if(newNum <= Math.floor(selectedData.length / 20))
                    {
                    $(e).text(newNum);
                    $(e).attr("value","val_"+ newNum);
                    }
                    else $(e).remove();
    
                }
                $(".pagerArea ul li").removeClass("active");
                $(pageLinks[0]).parents("li").addClass("active");
                
            }
            else
            {
                let newActive = selectedPage.parents().next();
                let thisNum = $(newActive).find("a").attr("value").replace("val_","");
                
                let index = pageLimit * thisNum;
                pushHtml(selectedData.slice(index-20, index));
                $(".pagerArea ul li").removeClass("active");
                newActive.addClass("active");
    
            }
        }
        //else alert("Tüm veriniz bu kadar");

    }
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

    universityPrograms = await getRequestAsyncWitoutHeader(mainPath + "getUnivercityPrograms");
    openedPrograms = [];
    universityPrograms.forEach(e => {
        e.programs.forEach(el => {
            openedPrograms.push({
                uniName:e.university_name,
                uniCity:el.city,
                programName:el.program_name,
                eduLevel:el.education_level,
                studyType:el.study_type,
                eduLevel:el.education_level,
                lenguage:el.study_language
            });
        });
    });

    
}