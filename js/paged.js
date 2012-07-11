$(document).ready(function(){
    setupHandlers();
    hideAllPages();
    showPage(1);
});

function setupHandlers(){
    $("#page1button").click(function(){
        hideAllPages();
        showPage(2);
    });
     $("#page2button").click(function(){
        hideAllPages();
        showPage(3);
    });
     $("#page3button").click(function(){
        hideAllPages();
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
   $("#page" + page).show();
}


