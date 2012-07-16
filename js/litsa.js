$(document).ready(function(){
    makeStars();
    makeForWork();
    makeToggle();
    makeProgress();
    
    api_server = "http://reviews.buckle.com/bvstaging/data";
    api_key = "p6rprcg4uup7cii1v15oov04f";
    api_version = "5.2";
    
    setupRPC(api_server, api_key, api_version);
    setupSpecificFormElements(api_server, api_key, api_version);
    
    $("#bv-submission-form").validate({
        errorElement: "div",
        errorPlacement: function(error, element) {
            element.parent().append(error);
        }
    })
});


function getParameterByName(name, url)
{
    url = url || window.location.search;
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(url);
    if(results == null)
        return "";
    else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
}

function hex2a(hex) {
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}


function makeStars(){
    var stars = $(".stars input");
    $(stars).change(function(){
        var i, j, label, index;
        var color = new Array("#944444", "#c16114", "#dcc926", "#9bbd40", "#3a8c55");
        var id = this.id;
        var labels = $(this).siblings("label");
        
        for(i=0; i<labels.length; i++){
            if (labels[i].getAttribute("for") == id){
                label = labels[i];
                index = i;
            }
        }
        
        if(this.checked == true){
            for(j=0; j<5; j++){
                if(j <= index){
                    $(labels[j]).css("color", color[index]);
                }
                if(j > index){
                    $(labels[j]).removeAttr("style");
                }
            }
        }
    });
}

function makeForWork(){
    $("label").click(function(){
        id = "#" + this.getAttribute("for");
    });
}

function makeToggle(){
    $(".toggle").click(function(){
        $(".toggleArea").show();
        $(this).hide();
        $(".teegle").show();
    });
}

function makeProgress(){
    
    $(":input").change(function(){
        var fieldset = $(this).closest("fieldset");
        var siblings = $(fieldset).find(":input");
        var complete = checksiblings(siblings);
        if(complete){
            $(fieldset).removeClass("incomplete");
            $(fieldset).addClass("complete");
        }else{
            $(fieldset).removeClass("complete");
            $(fieldset).addClass("incomplete");
        }
        
        $(fieldset).focusin();
    });
    
    $("fieldset").focusin(function(){
        $("fieldset").removeClass("focus");
        $("fieldset").removeClass("active");
        $(this).addClass("focus");
        $(this).addClass("active");   
    });
    
    function checksiblings(siblings){
        var k=0;
        for(var j=0; j<siblings.length; j++){
            if(siblings[j].value){
                k++;
            }
        }
        return k;
    }
    
    function moveforward(fieldset){
        var fieldsets = $("fieldset");
        var index = getIndex(fieldset);
        var complete = true;
        var next;
        
        while (complete == true && index < fieldsets.length){
            index++;
            next = $(fieldsets[index]);
            if($(next).hasClass("incomplete")){
                complete = false;
            }
        }
        
        $(fieldsets).removeClass("active");
        $(next).addClass("active");
    
    }

}

function postHandler(json){
    if(json.HasErrors)
    {
        $("#formErrors").empty();
        for(var fieldError in json.FormErrors.FieldErrors)
        {
            var errorMessage = json.FormErrors.FieldErrors[fieldError]['Message'];
            $("#formErrors").append("<p>"+errorMessage+"</p>");
        }
        $("#submit").removeClass("submitted");
        $("#spinner").hide();
        window.scroll(0, 0);
    } else {
        window.location = "http://www.google.com";
    }

}

function setupRPC(api_server, api_key, api_version)
{
    

    
    $("#bv-submission-form").get(0).setAttribute('action', api_server + "/submitreview.json");
    
    /*    
    var rpcFailure = _.delay(function () {
      rpcReady.reject();
    }, 10000);
    */
    
    var rpcConfig = {
        swf : window.location.protocol + '//display.bazaarvoice.com/common/util/easyxdm.swf',
        remote : api_server + '/rpcfile?apiversion=' +
        api_version + '&passkey=' +
        api_key
    };
    
    var rpcFunctions = {
        local : {
            // Handle the response back from API
            returnSubmissionResponse : postHandler
        }
    };
    
    
    $("#submit[type=submit]").click(function(event){
        $(this).addClass("submitted");
        $("#spinner").show();
    });
   
    return new easyXDM.Rpc(rpcConfig, rpcFunctions);
}


function getIndex(elem){
    var tag = elem.tagName;
    var all = $(tag);
    var index=all.length;
    for (var i=0; i<all.length; i++){
        if (elem == all[i]){
            index = i;
        }
    }
    return(index);
}

function setupSpecificFormElements(api_server, api_key, api_version)
{
    $("#contextdatavalue_Gender").change( function() {
        if($(this).val() == "Male")
        {
            $("#contextdatavalue_FemaleBodyType").hide();
            $("#contextdatavalue_MaleBodyType").show();
            $("#contextdatavalue_PersonalStyle").show();
        
        }
        else if($(this).val() == "Female") 
        {
            $("#contextdatavalue_FemaleBodyType").show();
            $("#contextdatavalue_MaleBodyType").hide();
            $("#contextdatavalue_PersonalStyle").hide();
        }
    
    });
    
    $("#NetPromoterScore-slider").slider({
        value:5,
        min: 0,
        max: 10,
        step: 1,
        slide: function( event, ui ) {
            $("#NetPromoterScore").val(ui.value);
        }
    });
    
    userstring = getParameterByName("user").substring(32);
    userstring = hex2a(userstring);
    userstring = "?" + userstring;
    userid = getParameterByName("userid", userstring);
    useremail = getParameterByName("emailaddress", userstring);
    productid = getParameterByName("productid");
    $('input[name=productid]').val(productid);
    $('input[name=useremail]').val(useremail);
    $('input[name=userid]').val(userid);
    
    $.getJSON(api_server+"/submitreview.json?callback=?", 
        "apiversion=" + api_version + "&passkey=" + api_key + "&productid=" + productid + "&userid=" + userid,
        function(json){
            if(json.Data.Groups.rating)
            {
                ratingName = json.Data.Groups.rating.SubElements[0].Id;
                fields = json.Data.Fields[ratingName].Options;
                $("#bv-rating-field").show();
                select = $("#bv-rating-field select");
                select.attr("name", ratingName)
                $.each(fields, function(index, field) {
                {
                    select.append("<option value=" + field.Value + ">" + field.Label + "</option>");
                }
                });
            }
        });
    
}