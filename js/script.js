var gameElement = document.getElementById("body"),
    nameOverlay = document.getElementById("chooseNameOverlay"),
    moneyP = document.getElementById("money"),
    spinner = document.getElementById("spinner"),
    money = 100,
    name,
    whichBackground = true;

var packageOne = {
  "100": 50,
  "200":30,
  "500":15,
  "1000": 5
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
  console.log(package);
  for(var property in package) {
    if (package.hasOwnProperty(property)) {
        var amount = Number(property);
        for(var o = 0; o < package[property];o++) {
          possibleArray.push(amount);
        }
    }
  }
  var item = possibleArray[getRandomInt(0,possibleArray.length)];
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

spinner.innerHTML = generateItemlist(packageOne).htmlString;

function getItemHTML(item, winning) {
  return "<div class='spinItem'><div class='spinInfo'>" + item.value + "</div></div>"
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

function testevent() {
  createEvent("Test event", 0, "+");
}

function doneSpin(){
  
}

