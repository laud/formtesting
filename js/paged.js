$(document).ready(function(){
    setupHandlers();
});

function setupHandlers(){
	var hack = $('#hack');

    $("#page1buttonnext").click(function(){
    	hack.click();
        if($("#page1 input").valid())
        {
            showPage(2);
            $("#formErrors").hide();
        }else{
        	$("#formErrors").show();
        }
    });
    $("#page2buttonnext").click(function(){
    	hack.click();
        if($("#page2 input").valid())
        {
            showPage(3);
            $("#formErrors").hide();
        }else{
        	$("#formErrors").show();
        }
    });
    $("#page3buttonnext").click(function(){
    	hack.click();
        if($("#page3 input").valid())
        {
            showPage(4);
            $("#formErrors").hide();
        }else{
        	$("#formErrors").show();
        }
    });
    
    $("#page2buttonprevious").click(function(){
		hack.click();
		$("#formErrors").hide();
		showPage(1);
    });
    $("#page3buttonprevious").click(function(){
		hack.click();
		$("#formErrors").hide();
		showPage(2);
    });
    $("#page4buttonprevious").click(function(){
		hack.click();
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


