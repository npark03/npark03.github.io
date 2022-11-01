let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

let level = 1;
let framecount = 0;
let animcount = 0;
let textFrame = -1;
let displayText = '';
let holdLevelText = false;
let holdDeathText = false;
let playercolor = "#db95a2";
let prevTouching = -2;
let prevMovex = 0;
let stick = false;
let prevTouchingBelow = -2;
let pause = false;
let playerIMG = document.getElementById("idle");
let skyIMG = document.getElementById("castlebackground");
let groundIMG = document.getElementById("groundimg");
let lagCount = 0; 
const button = document.getElementById("button");

var grav = 1;
var friction = 1.5;
// sky
var sky = {
  width: canvas.width,
  leftx: (canvas.width - canvas.width) / 2,
  topy: (canvas.height - 500) / 2,
};

function generateSky() {
  ctx.drawImage(skyIMG, -40 - level * 100 -(player.x / 8) , -200, 2000, 1000);
}
function clearSky() {
  ctx.clearRect(sky.leftx, 0, sky.width, canvas.height);
}


// Platforms
// [0] Ground, 
let platx = [sky.leftx];
let platy = [540];
let platwidth = [sky.width + 100];
let platheight = [canvas.height - 560];
// [1-4] Level 2, 
platx.push(310,665,1074,1378);
platy.push(440,337,240,240);
platwidth.push(100, 100, 100, 200);
platheight.push(100, 100, 100, 350)
// [5-10] Level 3
platx.push(-10,1326, 720, 920, 920, 1326);
platy.push(240,385,632, 480, 0, 537);
platwidth.push(156, 50, 650, 250, 50, 700);
platheight.push(800, 300, 50, 50, 480, 50);
// [11-20] Level 4
platx.push(sky.leftx, 613, 250, 410, 817, 1020, 817, 1225, 1225, 1328);
platy.push(537, 346, 785, -100, -100, 346, 785, 0, 700, 537);
platwidth.push(250, 50, 350, 50, 50, 50, 200, 50, 50, 400);
platheight.push(canvas.height - 560, 560, 50, 693, 695, 560, 50, 495, 495, canvas.height - 560);

let platy18 = 0
let platy19 = 700
// [21-26] Level 5
platx.push(-50, 1377, 1100, 818, 614, 818);
platy.push(537, 537, 537, 300, 0, 0);
platwidth.push(400, 400, 300, 50, 50, 50);
platheight.push(canvas.height - 560, canvas.height - 560, 50, 240, 347, 120);
// [27-37] Level 6
platx.push(-50, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200);
platy.push(537, 460, 360, 460, 560, 460, 360, 460, 560, 460, 537);
platwidth.push(350, 100, 100, 100, 100, 100, 100, 100, 100, 100, 400);
platheight.push(canvas.height-560, 500, 500, 500 , 500, 500, 500, 500, 500, 500, canvas.height-560)
let move6 = [];
for (let i = 0; i <= 9; i++){
  move6.push(5);
}

// [38] Level 7
platx.push(sky.leftx);
platy.push(300);
platwidth.push(sky.width + 100);
platheight.push(canvas.height - 560);


let start = 0; 
let end = 0;

function platIndex(){
  if (level <= 1){start = 0; end = 0;}
  if (level == 2){start = 0; end = 4;}
  if (level == 3){start = 5; end = 10;}
  if (level == 4){start = 11; end = 20;}
  if (level == 5){start = 21; end = 26;}
  if (level == 6){start = 27; end = 37;}
  if (level == 7){start = 0; end = 0};
}

function generatePlatforms(){
platIndex();
  if (level == 1){
    ctx.drawImage(groundIMG, platx[i] - 10, platy[i] - 48, platwidth[i] + 280, 1200)
  } else if (level == 2){
    ctx.drawImage(document.getElementById("castlelevel2"), 0, 0, 1480, 840)

  } else if (level == 3){
    ctx.drawImage(document.getElementById("castlelevel3"), 0, 0, 1480, 840)
  } else if (level == 4){
    ctx.drawImage(document.getElementById("castlelevel4"), 0, 0, 1480, 840)
    
    ctx.fillStyle = '#8e7ff0';
    ctx.shadowColor = "#5c46f0";
    ctx.shadowBlur = 15;  
    ctx.fillRect(platx[18], platy[18], platwidth[18], platheight[18]);
    ctx.fillRect(platx[19], platy[19], platwidth[19], platheight[19]);

    ctx.shadowColor = "none";
    ctx.shadowBlur = 0;  
    
    
  } else if (level == 5){
    ctx.drawImage(document.getElementById("castlelevel5"), 0, 0, 1480, 840)
    ctx.fillStyle = '#8e7ff0';
    ctx.shadowColor = "#5c46f0";
    ctx.shadowBlur = 15;  
    ctx.fillRect(platx[23], platy[23], platwidth[23], platheight[23]);
    ctx.shadowColor = "none";
    ctx.shadowBlur = 0;  
    
  } else if (level == 6){
    ctx.fillStyle = '#8e7ff0';
    ctx.shadowColor = "#5c46f0";
    ctx.shadowBlur = 15;  
    for (let k = 28; k <= 36; k++){
      ctx.fillRect(platx[k], platy[k], platwidth[k], platheight[k]);

    }
    ctx.shadowColor = "none";
    ctx.shadowBlur = 0;  
    ctx.drawImage(document.getElementById("castlelevel6"), 0, 0, 1480, 840)

  } else if (level == 7){  
    clearSky();

    ctx.fillStyle = "#c2515a";
    ctx.font = "bold 50px 'Press Start 2P'"
    ctx.fillText('YOU ESCAPED!', 450,300);

    const button = document.createElement("button");
    button.innerHTML = '>';



  } else {
    ctx.fillStyle = "#7d6f29";
    ctx.fillRect(platx[i], platy[i], platwidth[i], platheight[i]);
  }
  
  
}


function clearPlatforms(){
  platIndex();
  for (let i = start; i <= end; i++){
    ctx.clearRect(platx[i], platy[i], platwidth[i], platheight[i]);
  }
}


// player
var player = {
  x: 100 + sky.leftx,
  y: -100 + platy[0],
  v_x: 0,
  v_y: 0,
  height: 100,
  width: 74,
  moveleft: false,
  moveright: false,
  jump: false,
};

function generatePlayer() {
  if (playerIMG == document.getElementById("rightslide0") || playerIMG == document.getElementById("rightslide1")){
    ctx.drawImage(playerIMG, player.x - 33, player.y - 30, 110, 135)
  } else if (playerIMG == document.getElementById("leftslide0") || playerIMG == document.getElementById("leftslide1")){
    ctx.drawImage(playerIMG, player.x - 5, player.y - 30, 110, 135)
  } else {
    ctx.drawImage(playerIMG, player.x - 45, player.y - 30, 170, 135)

  }

}
function clearPlayer() {
  ctx.clearRect(player.x, player.y, player.width, player.height);
}
function holdJump() {
  player.jump = false;
}
function keyDown(input) {
  if (level == 7){
    return
  }
  if (
    (input.keyCode == 37 || input.keyCode == 65) &&
    player.moveleft == false
  ) {
    input.preventDefault();
    player.moveleft = true;
  }
  if (input.keyCode == 38 || input.keyCode == 32 || input.keyCode == 87) {
    input.preventDefault();
    if (createNewFrame() == true) {
      player.jump = true;
      setTimeout(holdJump, 300);
    }
  }
  if (
    (input.keyCode == 39 || input.keyCode == 68) &&
    player.moveright == false
  ) {
    input.preventDefault();
    player.moveright = true;
  }
}

function keyUp(input) {
  if (level == 7){
    return
  }
  if (input.keyCode == 37 || input.keyCode == 65) {
    player.moveleft = false;
  }
  if (input.keyCode == 38 || input.keyCode == 87 || input.keyCode == 32) {
    player.jump = false;
  }
  if (input.keyCode == 39 || input.keyCode == 68) {
    player.moveright = false;
  }
  if (input.keyCode == 27){
    pause = pause ? false : true;
  }
}

function LevelMessageList(){
  levelText = level == 1 ? ['','W','e','l','c','o','m','e',' t','o',' y','o','u','r',' f','i','n','a','l',' r','e','s','t','i','n','g',' p','l','a','c','e.'] : 
    level == 2 ? ['','T','r','y',' ','e','s','c','a','p','i','n','g','.','.','.', ' g','o',' a','h','e','a','d','.','.','.',' j','u','m','p.'] : 
    level == 3 ? ['','T','h','a','t',' i','s',' a',' b','i','g',' g','a','p',',', ' h','u','h?'] :
    level == 4 ? ['',"H","o","w","'d", " y","o","u"," d","o"," t","h","a","t?"] :
    level == 5 ? ['','You',' are', ' no', ' match', ' for', ' my', ' magic!'] :
    level == 6 ? ['','I',' c','a','n',' d','e','s','t','r','o','y',' E','V','E','R','Y','T','H','I','N','G!'] : ['Unknown'];
  return levelText;
}

function DeathMessageList(randomNumber){
  deathText = randomNumber == 0 ? ['I', ' cannot', ' believe', ' you', ' failed', ' that.']: 
    randomNumber == 1 ? ['', 'W','o','w.'] :
    randomNumber == 2 ? ['N','i','c','e',' ','j','o','b.'] :
    randomNumber == 3 ? ['How', ' about', ' you', ' start', ' trying?'] :
    randomNumber == 4 ? ['D','o', ' y','o','u', ' g','i','v','e', ' ','u','p', ' ','y','e','t','?'] :
    randomNumber == 5 ? ['You', ' might', ' as', ' well', ' just', ' stop', ' now.'] :
    randomNumber == 6 ? ['I', ' knew', ' you', ' were', ' no', ' match', ' for', ' me.'] :
    randomNumber == 7 ? ['Aw','w','w','w',', ','','',' so', ' close', '.','.','.', '','','','', ' N','o','t.'] :
    randomNumber == 8 ? ['This', ' was', ' supposed', ' to', ' be', ' easy.'] :
    randomNumber == 9 ? ['R','','','I','','','P','','','.'] : [];
  return deathText;
}

let randomNum = 0;
function redirectEnd(){
  window.location.replace("end.html")
}
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

function createNewFrame() {
  if (pause == true){
    generateSky();    
    generatePlatforms();      
    generatePlayer();
    ctx.fillStyle = "#c8d2e3";
    ctx.font = "bold 20px 'Press Start 2P'"
    ctx.fillText('Level ' + level, 25, 50);

    ctx.fillStyle = "#c2515a";
    ctx.font = "bold 50px 'Press Start 2P'"
    ctx.fillText('PAUSED', 550,300);
    return;
  }
  clearSky();
  clearPlayer();
  clearPlatforms();


  // move platforms
  // level 4
  if (level == 4){
    platy[18] = platy[18] < -platheight[18] ? 880 : platy[18] - 3;
    platy[19] = platy[19] < -platheight[19] ? 880 : platy[19] - 3;
  }
  
  // level 5
  if (level == 5){
    move5 = platx[23] <= 350 ? 5 : platx[23] >= 1100 ? - 5 : move5;
    platx[23] += move5;
  }

  // level 6
  for (let i = 28; i <= 36; i++){
    move6[i - 28] = platy[i] >= 700 ? - Math.abs(move6[i-28]) : platy[i] <= 400 ? Math.abs(move6[i-28]) : move6[i-28];
    platy[i] += move6[i-28];
  }


  // reset which index is touching
  let touching = -1;

  // hitboxes
  let touchbelow = false; // touchbelow
  platIndex();
  for (let i = start; i <= end; i++){
    if (
      player.x < platx[i] + platwidth[i] && 
      player.x + player.width > platx[i] &&
      player.y + player.v_y >= platy[i] - player.height && // predicted height below or equal to top obts.
      player.y + player.height < platy[i] + 10 && 
      i != touching
    ) {
      touchbelow = true;
      yland = platy[i] - player.height;
      touching = i;
    }
  }

  let touchabove = false;
  platIndex();
  for (let i = start; i <= end; i++){
    if (
      player.x < platx[i] + platwidth[i] &&
      player.x > platx[i] - player.width &&
      player.y + player.v_y <= platy[i] + platheight[i] &&
      player.y > platy[i] - 10 + platheight[i] && // top is below (10 above) bottom of obstacle
      i != touching
    ) {
      touchabove = true;
      ceiling = platy[i] + platheight[i];
      touching = i;
    }
  }
  

  let touchleft = false; // touchleft
  platIndex();
  for (let i = start; i <= end; i++){
    start = start == 0 ? 1 : start;
    if (
      player.y > platy[i] - player.height &&
      player.y < platy[i] + platheight[i] &&
      player.x + player.v_x <= platx[i] + platwidth[i] &&
      player.x + player.v_x > platx[i] && 
      i != touching
    ) {
      touchleft = true;
      leftwall = platx[i] + platwidth[i];
      touching = i;
    }
  }

  let touchright = false; // touchright
  platIndex();
  for (let i = start; i <= end; i++){
    start = start == 0 ? 1 : start;
    if (
      player.y > platy[i] - player.height &&
      player.y < platy[i] + platheight[i] &&
      player.x + player.v_x + player.width >= platx[i] &&
      player.x + player.v_x + player.width < platx[i] + 30 && 
      i != touching
    ) {
      touchright = true;
      rightwall = platx[i] - player.width;
      touching = i;
    }
  }        

  // horizontal movement
  if (
    player.moveleft == true &&
    player.v_x > -10 &&
    player.moveright == false
  ) {
    player.v_x = player.v_x < 0 || !touchbelow ? player.v_x - 0.4: -1;
  }
  if (
    player.moveright == true &&
    player.v_x < 10 &&
    player.moveleft == false
  ) {
    player.v_x = player.v_x > 0 || !touchbelow ? player.v_x + 0.4: 1;
  }
  if (
    player.moveleft == false &&
    player.moveright == false &&
    (player.v_x - friction >= 0 || player.v_x + friction <= 0) &&
    touchbelow
  ) {
    player.v_x += player.v_x > 0 ? -friction : friction;
  }
  if (
    player.moveleft == false &&
    player.moveright == false &&
    Math.abs(player.v_x) < friction &&
    touchbelow
  ) {
    player.v_x = 0;
  }
  if (touchleft && (player.v_x < 0 || prevMovex < 0)) {
    player.v_x = 0;
    player.x = leftwall;
  }
  if (touchright && (player.v_x > 0 || prevMovex > 0)) {
    player.v_x = 0;
    player.x = rightwall;
  }

  // moving plat below horizontal
  if (touchbelow && touching == 23){
    prevMovex = move5;
  }
  if ((touchbelow && touching == 23) || prevTouching == 23){
    player.x += prevMovex;
    prevTouching = 23;
  }
  if (touching != -1 && touching != prevTouching){
    prevTouching = touching;
    prevMovex = 0;
  }
  
  // wall jump
  if ((touchright || touchleft ) && player.v_y > 0){
    if (player.jump){
      player.v_x = touchright ? -5 : 5;
      player.v_y = -15;
      player.jump = false;
    } else {
    player.v_y = 3.5;
    }
  }

  
  // out of bounds / next level
  if (player.x > sky.width) {
    if (level == 6){
      player.x = 700;
      player.y = 537 - player.height;
      level++;
      const button = document.createElement("button");
      button.innerHTML = '>'
      document.body.appendChild(button);

      button.addEventListener('click',redirectEnd);
    } else {
    player.x = 0 - player.width;
    level++;
    }
  }
  if (player.x < -player.width) {
    player.x = sky.width - 40;
    level--;
  }
  if (player.y > canvas.height){
    player.x =  50;
    player.y = 100;
    player.v_x = 0;
    player.v_y = -5;
  }

  // vertical movement
  if (player.jump == true && touchbelow) {
    player.v_y = -10;
  }
  if (!touchbelow && player.jump == false) {
    player.v_y += grav;
  }
  if (touchbelow && player.jump == false) {
    player.v_y = 0;
    player.y = yland;
  }
  if (touchabove) {
    player.v_y = grav;
    player.y = ceiling;
  }
  
  

  player.x += player.v_x;
  player.y += player.v_y;

  if (level == 7){
    player.x = 680;
    player.y = 450 - player.height;
    player.v_x = 0;
    player.v_y = 0;
    
  }
  
  
  // animations
  if ((player.v_x > 0 && player.v_y == 0) || level == 7) { // moving straight right (1-6)
    framecount = framecount == 7 ? 0 : framecount + 1;
    animcount = framecount == 7 ? (animcount >= 6 || animcount < 1 ?  1 : animcount + 1) : animcount;
  }

  if (player.v_x < 0 && player.v_y == 0 && level != 7){ // moving straight left (7-12)
    framecount = framecount == 7 ? 0 : framecount + 1;
    animcount = framecount == 7 ? (animcount < 7 || animcount >= 12 ? 7 : animcount + 1) : animcount;
  }
  if (player.v_x == 0 && player.v_y == 0 && touchbelow && level != 7){ // not moving (0)
    animcount = framecount == 7 ? (animcount >= 0 ? -3 : animcount + 1) : animcount;
    framecount = framecount == 7 ? 0 : framecount + 1;
  } 

  

  if (((player.v_x >= 0 && !touchright && !touchleft) || (player.v_y < 0 && player.v_x >= 0)) && !touchbelow && level != 7){ 
    // straight and right up/down, no sliding
    if (player.v_y <= -10){animcount = 13} // FAST UP 13
    if (player.v_y <= 1 && player.v_y > -10){animcount = 14} // SLOW UP 14
    if (player.v_y <= 8 && player.v_y > 1){animcount = 15} // SLOW DOWN 15
    if (player.v_y > 8){animcount = 16} // FAST DOWN 16
  }

  if (player.v_x < 0 && !touchleft && !touchright && !touchbelow && level != 7){ // left up/down, no sliding
    if (player.v_y <= -10){animcount = 17} // FAST UP 17
    if (player.v_y <= 1 && player.v_y > -10){animcount = 18} // SLOW UP 18
    if (player.v_y <= 8 && player.v_y > 1){animcount = 19} // SLOW DOWN 19
    if (player.v_y > 8){animcount = 20} // FAST DOWN 20
  }

  if (player.v_y > 0 && touchleft && level != 7){
    animcount = framecount == 7 ? (animcount == 21 ? 22 : 21) : animcount;
    framecount = framecount == 7 ? 0 : framecount + 1;
  }       

  if (player.v_y > 0 && touchright && level != 7){
    animcount = framecount == 7 ? (animcount == 23 ? 24 : 23) : animcount;
    framecount = framecount == 7 ? 0 : framecount + 1;
  }        
  
  if (animcount == -3) {playerIMG = document.getElementById("idle0");}
  if (animcount == -2) {playerIMG = document.getElementById("idle1");}
  if (animcount == -1) {playerIMG = document.getElementById("idle2");}
  if (animcount == 0) {playerIMG = document.getElementById("idle3")}
  if (animcount == 1) {playerIMG = document.getElementById("right0");}
  if (animcount == 2) {playerIMG = document.getElementById("right1");}
  if (animcount == 3) {playerIMG = document.getElementById("right2");}
  if (animcount == 4) {playerIMG = document.getElementById("right3");}
  if (animcount == 5) {playerIMG = document.getElementById("right4");}
  if (animcount == 6) {playerIMG = document.getElementById("right5");}
  if (animcount == 7) {playerIMG = document.getElementById("left0");}
  if (animcount == 8) {playerIMG = document.getElementById("left1");}
  if (animcount == 9) {playerIMG = document.getElementById("left2");}
  if (animcount == 10) {playerIMG = document.getElementById("left3");}
  if (animcount == 11) {playerIMG = document.getElementById("left4");}
  if (animcount == 12) {playerIMG = document.getElementById("left5");}
  if (animcount == 13) {playerIMG = document.getElementById("rightup0");}
  if (animcount == 14){playerIMG = document.getElementById("rightup1");}
  if (animcount == 15){playerIMG = document.getElementById("rightdown0");}
  if (animcount == 16){playerIMG = document.getElementById("rightdown1");}
  if (animcount == 17) {playerIMG = document.getElementById("leftup0");}
  if (animcount == 18){playerIMG = document.getElementById("leftup1");}
  if (animcount == 19){playerIMG = document.getElementById("leftdown0");}
  if (animcount == 20){playerIMG = document.getElementById("leftdown1");}
  if (animcount == 21){playerIMG = document.getElementById("leftslide0");}
  if (animcount == 22){playerIMG = document.getElementById("leftslide1");}
  if (animcount == 23){playerIMG = document.getElementById("rightslide0");}
  if (animcount == 24){playerIMG = document.getElementById("rightslide1");}
  

  generateSky();
  generatePlatforms();
  generatePlayer();

  // text display
  // level 
  if (level == 1 && textFrame/4 <= LevelMessageList().length - 1){
    textFrame++;
    displayText += textFrame/4 % 1 == 0 ? LevelMessageList()[Math.floor(textFrame/4)] : '';
  } 
  if (player.x > sky.width){
    textFrame = -1;
    displayText = '';
    holdLevelText = true;
  }
  if (holdLevelText){
    textFrame++;
    if ((textFrame/4)%1 == 0){
      displayText += LevelMessageList()[Math.floor(textFrame/4)];
    }
  }
  if (Math.floor(textFrame/4) == LevelMessageList().length - 1 && holdLevelText){
    holdLevelText = false;
    textFrame = -1;
  }

  
  // death 

  if (player.y > canvas.height){
    holdLevelText = false;
    holdDeathText = true;
    randomNum = Math.floor(Math.random() * 10);
    randomNum = level == 4 && (randomNum == 0 || randomNum == 3 || randomNum == 8)? 1 : randomNum;
    displayText = '';
  }
  if (holdDeathText){
    textFrame++;
    if ((textFrame/4)%1 == 0){
      displayText += DeathMessageList(randomNum)[Math.floor(textFrame/4)];
    }
  }
  if (Math.floor(textFrame/4) == DeathMessageList(randomNum).length - 1 && holdDeathText){
    holdDeathText = false;
    textFrame = -1;
  }

  ctx.fillStyle = "#5c46f0";
  ctx.font = "bold 20px 'Press Start 2P'"
  ctx.fillText(displayText, 25, 50);        
  
  // for jump event listener
  if (touchbelow || touchright || touchleft){
    return true;
  } else {
    return false;
  }
}

setInterval(createNewFrame, 22);