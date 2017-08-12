var nameOverlay = document.getElementById("chooseNameOverlay"),
    gameElement = document.getElementById("body"),
    money = 500,
    name;

function start() {
  console.log("Lmao");
  nameOverlay.style.display = "none"; 
  name = $('#username').val();
}

function getRandomInt(a,b) {
  return Math.floor(Math.random()*(b-a+1)+a);
}
       