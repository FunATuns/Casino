var gameElement = document.getElementById("body"),
    nameOverlay = document.getElementById("chooseNameOverlay"),
    moneyP = document.getElementById("money"),
    spinner = document.getElementById("spinner"),
    money = 500,
    name,
    whichBackground = true;

var packageOne = {
  "100": 50,
  "200":30,
  "500":15,
  "1000": 5,
  "cost": 200
};

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
    createEvent(name + " has joined", 100, "+");
  }
}

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
  if(winning)
    return "<div class='spinItem roll'style='background-color:#ff0000'>" + item.value + "</div>"
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
  }
}

function getRandomInt(a,b) {
  return Math.floor(Math.random()*(b-a+1)+a);
}

function createEvent(message, affMoney, posOrNeg) {
  document.getElementById("history").classList.add('down');
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
  var data = generateItemlist(packageOne);
  $("#spinOptions").removeClass( "spinOptionsOut" );
  $("#spinOptions").addClass( "spinOptionsIn" );
  $("#spinOptions").css("height","10em");

  money = money - packageOne.cost;
  document.getElementById("money").innerHTML = money;
  createEvent(name + " spun the wheel", packageOne.cost, "-");
  spinner.innerHTML = data.htmlString;
  setTimeout(function() {
    $(".spinItem").css("transform", "translateX(-905em)");
    $("#spinOptions").removeClass( "spinOptionsIn" );
    $("#spinOptions").addClass( "spinOptionsOut" );
    $("#spinOptions").css("height","15em");
  },500);
  setTimeout(function() {
  doneSpin(data.winnings);
  },10000);
}

function doneSpin(amountWon) {
  money = money + amountWon;
  document.getElementById("money").innerHTML = money;
  createEvent(name + " won $" + amountWon + "!", amountWon, "+");
  $("#spinnerOptions").text("You have won $" + amountWon + "!")
}

