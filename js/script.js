var gameElement = document.getElementById("body"),
    nameOverlay = document.getElementById("chooseNameOverlay"),
    moneyP = document.getElementById("money"),
    spinner = document.getElementById("spinner"),
    money = 200000,
    name,
    whichBackground = true,
    spinAgain = true,
    elID;

var packageOne = {
  "100": 50,
  "200":26,
  "500":20,
  "1000": 4,
  "cost": 200
};

var middleClass = {
  "100": 40,
  "200":30,
  "500":20,
  "1000":10,
  "cost": 500
};

var gambPackage = {
  "100": 90,
  "200":0,
  "500":0,
  "10000": 10,
  "cost": 1500
};

var gambPackage2 = {
  "100":0,
  "500":0,
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
    spinAgain = false;
    var data = generateItemlist(selPackage);
    money = money - selPackage.cost;
    document.getElementById("money").innerHTML = money;
    createEvent(name + " spun the wheel", selPackage.cost, "-");
    spinner.innerHTML = data.htmlString;
    setTimeout(function() {
      $(".spinItem").css("transform", "translateX(-905em)");
    },500);
    setTimeout(function() {
    doneSpin(data.winnings);
    },10000);
  }
}

function doneSpin(amountWon) {
  money = money + amountWon;
  document.getElementById("money").innerHTML = money;
  if (money < 0) {
    alert("Sorry! you ran out of money. Please try again!");
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
  }
  else if (elID == 2) {
    selPackage = middleClass;
    if (selPackage.cost > money) {
      alert("You do not have enough money for this package!");
      selPackage = packageOne;
    }
    else {
      $(".selected").removeClass("selected");
      $("#midClass").addClass("selected");
    }
  }
  else if (elID == 3) {
    selPackage = gambPackage;
    if (selPackage.cost > money) {
      alert("You do not have enough money for this package!");
      selPackage = packageOne;
    }
    else {
      $(".selected").removeClass("selected");
      $("#gambPack").addClass("selected");
    }
  }
  else if (elID == 4) {
    selPackage = gambPackage2;
    if (selPackage.cost > money) {
      alert("You do not have enough money for this package!");
      selPackage = packageOne;
    }
    else {
      $(".selected").removeClass("selected");
      $("#gambPack2").addClass("selected");
    }
  }
}
