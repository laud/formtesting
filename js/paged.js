$(document).ready(function(){
    setupHandlers();
});

function setupHandlers(){
    $("#page1button").click(function(){
        
        if($("#page1 input").valid())
        {
            showPage(2);
        } 
        else 
        {
            alert("no");
        }
    });
    $("#page2button").click(function(){
        if($("#page2 input").valid())
        {
            showPage(3);
        } 
        else 
        {
            alert("no");
        }
    });
    $("#page3button").click(function(){
        if($("#page2 input").valid())
        {
            showPage(4);
        } 
        else 
        {
            alert("no");
        }
        showPage(4);
    });
}

function hideAllPages(){
    $("#page1").hide();
    $("#page2").hide();
    $("#page3").hide();
    $("#page4").hide();
}

function showPage(page){
    $("#page" + (page - 1)).hide();
    $("#page" + page).show();
}


