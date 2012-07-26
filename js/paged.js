$(document).ready(function(){
    setupHandlers();
});

function setupHandlers(){
    $("#page1buttonnext").click(function(){
        if($("#page1 input, #page1 textarea, #page1 select").valid())
        {
            showPage(2);
            $("#formErrors").hide();
        }else{
            $("#formErrors").show();
            window.scroll(0, 0);
        }
    });
    $("#page2buttonnext").click(function(){
        if($("#page2 input, #page2 textarea, #page2 select").valid())
        {
            showPage(3);
            $("#formErrors").hide();
        }else{
            $("#formErrors").show();
            window.scroll(0, 0);
        }
    });
    $("#page3buttonnext").click(function(){
        if($("#page3 input, #page3 textarea, #page3 select").valid())
        {
            showPage(4);
            $("#formErrors").hide();
        }else{
            $("#formErrors").show();
            window.scroll(0, 0);
        }
    });
    
    $("#page2buttonprevious").click(function(){
        $("#formErrors").hide();
        showPage(1);
    });
    $("#page3buttonprevious").click(function(){
        $("#formErrors").hide();
        showPage(2);
    });
    $("#page4buttonprevious").click(function(){
        $("#formErrors").hide();
        showPage(3);
    });
}

function hideAllPages(){
    $("section").hide();
}

function showPage(page){
    hideAllPages();
    $("#page" + page).show();
}


