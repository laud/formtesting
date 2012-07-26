$(document).ready(function(){
    makeStars();
    makeForWork();
    makeToggle();
    makeProgress();
   
    api_server = "http://reviews.buckle.com/data";
    api_key = "dj5i32nr8c0kcv4r4yuuorwpn";
    api_version = "5.2";    
    
    $('#submit').click(function(e){
        if($("#page4 input").valid())
        {
            e.preventDefault();
            $.ajax({
                type:'POST', 
                url: api_server + "/submitreview.json", 
                data:$('#bv-submission-form').serialize(), 
                success: function(response) {
                    postHandler(response);
                }
            });
        } else {
            $("#formErrors").show();
            window.scroll(0, 0);
        }
    });
    
   
        
    //$("#bv-submission-form").get(0).setAttribute('action', api_server + "/submitreview.json");

    setupSpecificFormElements(api_server, api_key, api_version);
    
    $("#bv-submission-form").validate({ 
        rules: {
            reviewtext: {
                minlength: 100
            }
        },
        errorElement: "p",
        highlight: function(element, errorClass) {
            var fieldset = $(element).closest('fieldset').addClass('invalid');
            fieldset.removeClass('valid');
            $("#formErrors").show();
            $(fieldset).removeClass("complete");
            $(fieldset).addClass("incomplete");
        },
        unhighlight: function(element, errorClass) {
            var fieldset = $(element).closest('fieldset').addClass('valid');
            fieldset.removeClass('invalid');
            if($(element).rules().required){
                $(fieldset).removeClass("incomplete");
                $(fieldset).addClass("complete");
            }
            $("#formErrors").hide();
        }           
    })
    
   
});


function postHandler(json){
    if(json.HasErrors)
    {
        $("#formErrors").show();
        $("#formErrors").empty();
        for(var fieldError in json.FormErrors.FieldErrors)
        {
            var errorMessage = json.FormErrors.FieldErrors[fieldError]['Message'];
            $("#formErrors").append("<li>"+errorMessage+"</li>");
        }
        $("#submit").removeClass("submitted");
        $("#spinner").hide();
        window.scroll(0, 0);
    } else {
        window.location = "http://www.google.com";
    }

}



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
    var stars = $("#fstars input");
    $(stars).change(function(){
        var i, j, label, index;
        var color = new Array(
        "#944444", "#c16114", "#dcc926", "#9bbd40", "#3a8c55"
    );
        var message = new Array(
        "Terrible", "Unsatisfactory", "Average", "Satisfactory", "Excellent"
    );
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
        
        $('#fstars .value').text(message[index]);
        $('#fstars .value').css('color', color[index]);
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
        checkComplete(fieldset);
    });
    
    $("fieldset").focusin(function(){
        $("fieldset").removeClass("active");
        $(this).addClass("active");   
    });
    
    function checkComplete(fieldset){
        var siblings = $(fieldset).find(":input");
        var complete = checksiblings(siblings);
        if(complete && !fieldset.hasClass("invalid")){
            $(fieldset).removeClass("incomplete");
            $(fieldset).addClass("complete");
        }else{
            $(fieldset).removeClass("complete");
            $(fieldset).addClass("incomplete");
        }
        
        $(fieldset).focusin();
    }
    
    function checksiblings(siblings){
        var k=0;
        for(var j=0; j<siblings.length; j++){
            if(siblings[j].value){
                
                if($(siblings[j]).is(":checkbox")){
                    if($(siblings[j]).is(':checked')){
                        k++;
                    }
                } else{
                    k++;
                }
            }
        }
        return k;
    }
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
    $('input[name=passkey]').val(api_key);
    
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
            $(".ui-slider-handle").text(ui.value);
            var fieldset = $(this).closest("fieldset");
            fieldset.removeClass("incomplete");       
            fieldset.addClass("complete");
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
    $.getJSON(api_server+"/submitreview.json", 
    "apiversion=" + api_version + "&passkey=" + api_key + "&productid=" + productid + "&userid=" + userid,
    function(json){
        if(json.Data.Groups.rating)
        {
            ratingName = json.Data.Groups.rating.SubElements[0].Id;
            fields = json.Data.Fields[ratingName].Options;

            $("#bv-rating-field").show();
            $("#bv-rating-field select").rules("add", {required: true});
            $("#bv-rating-field select").addClass("required");
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