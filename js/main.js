
var hideAll = function() {
    $("#page1").hide();
    $("#page2").hide();
    $("#page3").hide();
}

$("#page1done").click(function() {
    hideAll();
    $("#page2").show();
});
