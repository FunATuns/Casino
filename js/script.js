
    var nameOverlay = document.getElementByID("chooseNameOverlay"),
    usernameInput = document.getElementByID("username"),
    gameElement = document.getElementByID("body"),
    money = 500,
    name;


function start() {
     nameOverlay.style.display = "none"; 
  gameElement.style.overflow = "auto";
  name = usernameInput.value;
}

function getRandomInt(a,b) {
      return Math.floor(Math.random()*(b-a+1)+a);
}
       