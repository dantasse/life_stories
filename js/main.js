
function hideAll() {
    $("#page1").hide();
    $("#page2").hide();
    $("#page3").hide();
}

var age;
var lifeBreaks = [];

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

$("#page1done").click(function() {
    var ageStr = $("#age").val();
    age = parseInt(ageStr);
    if (isNaN(age) || age < 0 || age > 120) { // let's be optimistic here
        $("#page1error").text("Stop it. How old are you?");
        $("#age").select();
        return;
    }
    hideAll();
    setupPage2();
});

// returns a random integer between low (inclusive) and high (exclusive)
function randInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

function setupPage2() {
    var numLifeBreaks = Math.max(5, age / 7); // you should have at least a few
    // life segments, but no matter how old you are you should have one every
    // few years I guess
    lifeBreaks = [];
    while (lifeBreaks.length < numLifeBreaks && lifeBreaks.length < age-1) {
        // the age-1 is a hack just in case you get someone who's, say, 3yo;
        // they can only have 2 breaks in their life, at 1 and 2
        newLifeBreak = randInt(1, age);
        if (lifeBreaks.indexOf(newLifeBreak) == -1) {
            lifeBreaks.push(newLifeBreak);
        }
    }
    lifeBreaks.push(0);
    lifeBreaks.sort(function cmp(a,b) {return a-b;}); // numeric, not lexicographic

    $("#page2").show();
    var totalWidth = 900; // meh? 1024 is still popular I guess; borders add to this
    for (var i = 0; i < lifeBreaks.length; i++) {
        
        var newBox = $("<span class='life_chunk'>" + lifeBreaks[i] +
            "<textarea class='life_chunk_text' rows='5'></textarea></span>");
        var numYears;
        if (i == lifeBreaks.length - 1) {
            numYears = age - lifeBreaks[i];
        } else {
            numYears = lifeBreaks[i+1] - lifeBreaks[i];
        }
        width = (totalWidth / age) * numYears;
        newBox.attr({"style": "width:" + width + "px"});
        $("#boxes").append(newBox);
    }
}
