var gameElement = document.getElementById("body"),
    nameOverlay = document.getElementById("chooseNameOverlay"),
    moneyP = document.getElementById("money"),
    spinner = document.getElementById("spinner"),
    money = 500,
    name,
    whichBackground = true,
    spinAgain = true,
    elID,
    ready = false,
    leadboardPeople;

var packageOne = {
  "100": 50,
  "200":26,
  "500":20,
  "1000": 4,
  "cost": 200
};

var middleClass = {
  "200":30,
  "500":35,
  "1000":25,
  "2000":10,
  "cost": 500
};

var gambPackage = {
  "500": 90,
  "10000": 10,
  "cost": 1500
};

var gambPackage2 = {
  "10000": 90,
  "1000000": 10,
  "cost": 100000
};

var selPackage = packageOne;

function start() {
  if ($('#username').val() == "") {
    document.getElementById("nousername").style.display = "block";
  }
  else {
    nameOverlay.style.display = "none"; 
    gameElement.style.overflow = "auto";
    name = $('#username').val();
    document.getElementById("usernamePlace").innerHTML = name;
    document.getElementById("profile").style.display = "block";
    document.getElementById("winningHistory").style.display = "block";
    document.getElementById("prHR").style.display = "block";
    moneyP.innerHTML = money;
    createEvent(name + " has joined", 500, "+");
    ready = true;
    generateLeaderboard();
  }
  if (screen.width != $(window).width()) {
    alert("Please maximize your browser!");
  }
}

$(window).resize(function() {
  setTimeout(function() {
    if (screen.width != $(window).width()) {
    alert("Please maximize your browser!");
    }
  }, 3500);
});

function generateItem (package) {
  var possibleArray = [];
  for(var property in package) {
    if (package.hasOwnProperty(property) && property != "cost") {
        var amount = Number(property);
        for(var o = 0; o < package[property];o++) {
          possibleArray.push(amount);
        }
    }
  }
  var item = possibleArray[getRandomInt(0,possibleArray.length-1)];
  return {value:item};
}

//generateItem(packageOne);

function generateItemlist (package) {
  var data = {
    htmlString : "",
    winnings : 0
  
  };

  for(var i = 0; i < 100; i++ )
  {
    var item = generateItem(package);
    if(i == 90) 
      data.htmlString += getItemHTML(item,true),
      data.winnings = item.value;
    else
      data.htmlString += getItemHTML(item,false);

    if(i == 99)
      return data;
  }
  return null;
}

function getItemHTML(item, winning) {
  return "<div class='spinItem roll'style='background-color:#" + getColorFromValue(item.value) +"'>" + item.value + "</div>"
}

function getColorFromValue(value) 
{
  switch(value) {
    case 100:
      return "caffbf";
      break;
    case 200:
      return "88ff70";
      break;
    case 500:
      return "42ff1c";
      break;
    case 1000:
      return "1cffa0";
      break;
    case 2000:
      return "1cffec";
      break;
    case 10000:
      return "1cb3ff";
      break;
    case 1000000:
      return "e900ff";
      break;
  }
}

function getRandomInt(a,b) {
  return Math.floor(Math.random()*(b-a+1)+a);
}

function createEvent(message, affMoney, posOrNeg) {
  if ($('#history tr').length > 15) {
    $('#history tr:last').remove();
  }
  document.getElementById("history").style.marginTop = "0";
  if (whichBackground) {
    $('<tr style="background-color: rgba(255, 255, 255, .5)"><td>' + message + '</td><td>' + posOrNeg + '$' + affMoney + '</td></tr>').hide().fadeIn().prependTo('#history');
    whichBackground = false;
  }
  else {
    $('<tr><td>' + message + '</td><td>' + posOrNeg + '$' + affMoney + '</td></tr>').hide().fadeIn().prependTo('#history');
    whichBackground = true;
  }
}

function spin () {
  if (spinAgain) {
    if(selPackage.cost == 200 || money >= selPackage.cost)
    {
      spinAgain = false;
      generateLeaderboard()
      var data = generateItemlist(selPackage);
      money = money - selPackage.cost;
      document.getElementById("money").innerHTML = money;
      createEvent(name + " spun the wheel", selPackage.cost, "-");
      spinner.innerHTML = data.htmlString;
      setTimeout(function() {
        $(".spinItem").css("transform", "translateX(-855em)");
      },500);
      setTimeout(function() {
      doneSpin(data.winnings);
      generateLeaderboard();
      },10000);
    }
    else
    alert("Sorry! You do not have enough money for this package. Please try a different package.");
  }
}

function generateLeaderboard() {
  var copyBoard = [{name: "Homeless man", money: 750}, {name: "College kid", money: 1500},{name: "Mcdonalds manager", money: 3000}, {name: "Senior PGA player", money: 5000},{name: "Greece", money: 7500},{name: "Joe", money: 10000},{name: "ESports player", money: 15000},{name: "Sega CEO", money: 20000},{name: "Music star", money: 50000},{name: "Football star", money: 100000},{name: "PGA player", money: 250000}, {name: "Mark Zuckerburg", money: 1000000}, {name: "Bill Gates", money: 100000000},{name: "America", money: 3000000000}];
  copyBoard.push({name: name, money: money})
  copyBoard.sort(function(a, b) {
    return b.money - a.money;
  });

  var listHtml = "";

  for(var i = 0; i < copyBoard.length;i++) {
    if(copyBoard[i].name == name)
      listHtml += "<li style='background-color: white; color: #00457D'>" + (i+1) + ". " + copyBoard[i].name + "  $" + copyBoard[i].money + "</li>";
    else
      listHtml += "<li>" + (i+1) + ". " + copyBoard[i].name + "  $" + copyBoard[i].money + "</li>";
  }
  document.getElementById("leaderboardSec").innerHTML = listHtml;
}

function doneSpin(amountWon) {
  money = money + amountWon;
  document.getElementById("money").innerHTML = money;
  if (money < 0) {
   
    location.reload();
  }
  createEvent(name + " won $" + amountWon + "!", amountWon, "+");
  $("#spinnerOptions").text("You have won $" + amountWon + "!");
  spinAgain = true;
}

function changeSel(elID) {
  if (elID == 1) {
    selPackage = packageOne;
    $(".selected").removeClass("selected");
    $("#packageOne").addClass("selected");
    document.getElementById("packName").innerHTML = "Classic Pack";
    document.getElementById("packChanceOne").innerHTML = "50% chance of $100";
    document.getElementById("packChanceTwo").innerHTML = "26% chance of $200";
    document.getElementById("packChanceThree").innerHTML = "20% chance of $500";
    document.getElementById("packChanceFour").innerHTML = "4% chance of $1000";
    
  }
  else if (elID == 2) {
    selPackage = middleClass;
    $(".selected").removeClass("selected");
    $("#midClass").addClass("selected");
    document.getElementById("packName").innerHTML = "Middle Class Package";
    document.getElementById("packChanceOne").innerHTML = "30% chance of $200";
    document.getElementById("packChanceTwo").innerHTML = "35% chance of $500";
    document.getElementById("packChanceThree").innerHTML = "25% chance of $1000";
    document.getElementById("packChanceFour").innerHTML = "10% chance of $2000";
  }
  else if (elID == 3) {
    selPackage = gambPackage;
    $(".selected").removeClass("selected");
    $("#gambPack").addClass("selected");
    document.getElementById("packName").innerHTML = "Gambler's Package";
    document.getElementById("packChanceOne").innerHTML = "90% chance of $500";
    document.getElementById("packChanceTwo").innerHTML = "10% chance of $10,000";
    document.getElementById("packChanceThree").innerHTML = " ";
    document.getElementById("packChanceFour").innerHTML = " ";
  }
  else if (elID == 4) {
    selPackage = gambPackage2;
    $(".selected").removeClass("selected");
    $("#gambPack2").addClass("selected");
    document.getElementById("packName").innerHTML = "Gambler's Package pt. 2";
    document.getElementById("packChanceOne").innerHTML = "90% chance of $10,000";
    document.getElementById("packChanceTwo").innerHTML = "10% chance of $1,000,000";
    document.getElementById("packChanceThree").innerHTML = " ";
    document.getElementById("packChanceFour").innerHTML = " ";
  }
}

$(document).keypress(function(event){
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if(keycode == '13'){
    if(ready){
      document.getElementById("spinnerBtn").style.backgroundColor = "white";
      document.getElementById("spinnerBtn").style.color = "#63C900";
      $("#spinnerBtn").addClass('activeBtn');
      setTimeout(function() {
        document.getElementById("spinnerBtn").style.backgroundColor = "";
        document.getElementById("spinnerBtn").style.color = "";
        $("#spinnerBtn").removeClass('activeBtn');
        document.getElementById('spinnerBtn').click();
      }, 100);
    }
    else {
      start();
    }
  }
});