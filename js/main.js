
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
    setupPage2();
});

// returns a random integer between low (inclusive) and high (exclusive)
function randInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

function setupPage2() {
    var numLifeBreaks = Math.max(5, age / 25); // you should have at least a few
    // life segments, but no matter how old you are you should have one every
    // few years I guess
    var lifeBreaks = [];
    while (lifeBreaks.length < numLifeBreaks && lifeBreaks.length < age-1) {
        // the -1 is a hack just in case you get someone who's 3 years old;
        // they can only have 2 breaks in their life, at 1 and 2
        newLifeBreak = randInt(1, age);
        if (lifeBreaks.indexOf(newLifeBreak) == -1) {
            lifeBreaks.push(newLifeBreak);
        }
    }
    lifeBreaks.sort();

    $("#page2").show();
    $("#boxes").text(lifeBreaks);
}
