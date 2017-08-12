var gameElement = document.getElementById("body"),
    nameOverlay = document.getElementById("chooseNameOverlay"),
    moneyp = document.getElementById("money"),
    money = 100,
    name,
    whichBackground = true;

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
    moneyp.innerHTML = money;
    createEvent(name + " has joined", 100, "+");
  }
}

function getRandomInt(a,b) {
  return Math.floor(Math.random()*(b-a+1)+a);
}

function createEvent(message, affMoney, posOrNeg) {
  if (whichBackground) {
    $('#history').prepend($('<tr style="background-color: rgba(255, 255, 255, .5)"><td>' + message + '</td><td>' + posOrNeg + '$' + affMoney + '</td></tr>'));
    whichBackground = false;
  }
  else {
    $('#history').prepend($('<tr><td>' + message + '</td><td>' + posOrNeg + '$' + affMoney + '</td></tr>'));
    whichBackground = true;
  }
}

function testevent() {
  createEvent("Test event", 0, "+");
}