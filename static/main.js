
function hideAll() {
    $("#page1").hide();
    $("#page2").hide();
    $("#page3").hide();
}

var age;
var lifeBreaks = [];
var lifeStory = {};
// data structure will be: {story:[{startAge:0, endAge:4, text: 'foo'}, ...]}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

$("#page1done").click(function() {
    var ageStr = $("#age").val();
    age = parseInt(ageStr);
    if (isNaN(age) || age < 0 || age > 120) { // let's be optimistic here
        $("#page1error").text("Sorry, you have to enter a valid age.");
        $("#age").select();
        return;
    }
    $("#page1error").text("");
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
    for (var i = 0; i < lifeBreaks.length; i++) {
        
        var newBox = $("<div class='life_chunk'>" +
            "<div class='life_chunk_number'>" +
                lifeBreaks[i] +
            "</div>" + 
            "<div class='life_chunk_text_box'>" +
                "<textarea maxlength='140' class='life_chunk_text'></textarea>" +
            "</div>" +
            "</div>");
        var numYears;
        if (i == lifeBreaks.length - 1) {
            numYears = age - lifeBreaks[i];
        } else {
            numYears = lifeBreaks[i+1] - lifeBreaks[i];
        }
        newBox.attr({"style": "height:" + (numYears * 30) + "px"});
        $("#boxes").append(newBox);
    }
}

$("#page2done").click(function() {
    // lifeStory = {"currentAge": age, "ages": [], "texts": []};
    lifeStory = {'story':[]}
    var textAreas = $("textarea.life_chunk_text");
    var numChunks = textAreas.length;
    lifeBreaks.push(age);
    for (var i = 0; i < numChunks; i++) {
        lifeStory.story[i] = {'startAge': lifeBreaks[i], 'endAge': lifeBreaks[i+1],
            'text': textAreas[i].value};
        // lifeStory.ages[i] = lifeBreaks[i];
        // lifeStory.texts[i] = textAreas[i].value;
    }
    hideAll();
    $("#page3").show();
});

$("#save").click(function() {
    $("#saving").show();
    $.ajax({
        type: "POST",
        url: "/save",
        data: JSON.stringify(lifeStory),
        contentType:"application/json; charset=utf-8"
    }).done(function() {
        $("#saving").hide();
        $("#doneSaving").show();
    });
});

$("#restart").click(function() {
    hideAll();
    $("#page1").show();
    $("#boxes").html("");
});
