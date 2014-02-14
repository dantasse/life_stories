
function hideAll() {
    $("#page1").hide();
    $("#page2").hide();
    $("#page3").hide();
}

var age;

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

$("#page1done").click(function() {
    var ageStr = $("#age").val();
    age = parseInt(ageStr);
    if (isNaN(age) || age < 0 || age > 200) { // let's be optimistic here
        $("#page1error").text("Stop it. How old are you?");
        $("#age").select();
        return;
    }
    hideAll();
    $("#page2").show();
    $("#page2").text(age);
});
