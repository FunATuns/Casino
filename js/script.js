var nameOverlay = document.getElementById("chooseNameOverlay"),
    usernameInput = document.getElementById("username"),
    gameElement = document.getElementById("body"),
    money = 500,
    name;
    
function start() {
  console.log("Lmao");
  nameOverlay.style.display = "none"; 
  gameElement.style.overflow = "auto";
  name = usernameInput.value;
}

function getRandomInt(a,b) {
  return Math.floor(Math.random()*(b-a+1)+a);
}
       