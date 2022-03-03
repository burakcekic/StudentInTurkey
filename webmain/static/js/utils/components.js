function universityCardComponent(id, name, website, address, img) 
{
    return `
    <div class="col-lg-4 col-sm-6 mb-5" id = "${id}"  >
        <div class="card p-0 border-primary rounded-0 hover-shadow">
            <img class="card-img-top rounded-0" src="${img}" alt="course thumb" style="height:300px">
            <div class="card-body"> 
                <a href="/university-detail/?q=${id}" target="blank">
                    <h5 class="card-title" style="height:55px">${name}</h5>
                </a> 
                <a href="/university-detail/?q=${id}" target="blank" class="btn btn-primary btn-sm">detail</a>
            </div>
        </div>
    </div>`;
}

function programComponent(id,uniName,uniId,progName,city,eduLevel,studyType,Lenguige) 
{ 
    return `
    <li class=" border-bottom hover-shadow" data-id="${id}">
        <div class="container-fluid d-md-table mb-4 w-100">
            <div class="d-md-table-cell p-3 vertical-align-middle mb-4 mb-md-0">
                <a href="university-detail/?q=${uniId}" class="h4 mb-3 d-block">${uniName}</a>
                <a href="javascript:void(0)" class="h6 mb-3 d-block">${progName}</a>
            </div>
            <div class="d-md-table-cell text-right pt-3 pr-0 pr-md-4"><a href="javascript:void(0)" onclick="toggleProgramDetailComponent(this)" class="btn btn-primary">read more</a></div>
        </div>
        <div class="container-fluid detail-area" style="display: none;">
            <div class="col-12 mb-4">
                <h3 class="mb-3">Detail</h3>
                <div class="col-12 px-0">
                    <div class="row">
                        <div class="col-md-6">
                            <ul class="list-styled">
                                <li>City: <b id="detail-city">${city}</b></li>
                                <li>Education Level: <b id="detail-edu-level">${eduLevel}</b></li>
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <ul class="list-styled">
                                <li>Study Type: <b id="detail-study-type">${studyType}</b></li>
                                <li>Lenguige: <b id="detail-lenguige">${Lenguige}</b></li>
                            </ul>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    </li>
    `;

}

function toggleProgramDetailComponent(e) 
{
    $(e).parents("li").find(".detail-area").toggle("slow");
}

function fraqComponent(id,question,answer) 
{
    return `
    <li class=" border-bottom hover-shadow" data-id="${id}">
        <div class="container-fluid d-md-table mb-4 w-100">
            <div class="d-md-table-cell p-3 vertical-align-middle mb-4 mb-md-0"> 
                <a href="javascript:void(0)" class="h6 mb-3 d-block">${question}</a>
            </div>
            <div class="d-md-table-cell text-right pt-3 pr-0 pr-md-4"><a href="javascript:void(0)" onclick="toggleProgramDetailComponent(this)" class="btn btn-primary">read more</a></div>
        </div>
        <div class="container-fluid detail-area" style="display: none;">
            <div class="col-12 mb-4">
                <h3 class="mb-3">Answer</h3>
                <p>${answer}</p>
            </div>
        </div>
    </li>
    `;

}

function toggleFraqDetailComponent(e) 
{
    $(e).parents("li").find(".detail-area").toggle("slow");
}



function cityCardComponent(id,img,name,text)
{
    return `
    <div class="col-lg-3 col-sm-6 mb-5 mb-lg-2" id = "${id}">
        <div class="card border-0 rounded-0 hover-shadow">
            <div class="card-img position-relative">
                <img class="card-img-top rounded-0" src="${img}" alt="event thumb"> 
            </div>
            <div class="card-body"> 
                <h4 style = "font-family:'arial'">
                    <a href="/city-detail/?q=${id}" target="blank" class="card-title" style = "font-family:'arial'">
                        <i class="ti-location-pin text-primary mr-2"></i>${name}
                    </a>
                </h4>
                <a href="/city-detail/?q=${id}" target="blank" class="card-title" style = "font-family:'arial'">
                    ${text}
                </a>
            </div>
        </div>
    </div>
    `;
}
