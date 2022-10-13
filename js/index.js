document.getElementById("start-button").onclick = () => {
  myGameArea.start();
};

const road = new Image();
road.src = 'images/road.png';
const myObstacles = [];
  
const myGameArea = {
  canvas : document.getElementById('canvas'),
  frames: 0,
  start: function () {
    this.context= this.canvas.getContext ('2d');
    this.interval = setInterval(updateGameArea, 20); 
    this.context.drawImage(road,0,0,canvas.width,canvas.height);
    ;
  },
  score: function(){
    const points = Math.floor(this.frames / 5);
    this.context.font = '18px serif';
    this.context.fillStyle = "black";
    this.context.fillText(`Score: ${points}`,350, 50);
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.drawImage(road,0,0,canvas.width,canvas.height);
    
  },
  stop: function(){
    clearInterval(this.interval);
  }
  
  
  
};



class car {
  constructor(){
    this.x = 230
    this.y = 550;
    this.width = 40;
    this.height = 80;
    this.car = new Image();
    this.car.src = 'images/car.png'
  }

  update() {
    //const ctx = myGameArea.context;
    //ctx.fillStyle = this.color;
    myGameArea.context.drawImage(this.car,this.x,this.y,40,80)
  }

  left(){ 
    return this.x}

  right(){ 
    return this.x+this.width}

  top(){ 
    return this.y}

  bottom(){ 
    return this.y+this.height}

  crashWith(object){
    return !(this.bottom() < object.top() || this.top() > object.bottom() || this.right() < object.left() || this.left() > object.right());
  }


}

const player = new car();

function updateGameArea() {
  myGameArea.clear();
  player.update();
  updateObstacles(); 
  checkGameOver();
  myGameArea.score();
}


class Obstacle {
  constructor(x,y,width,height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  update(){
    const ctx = myGameArea.context;
    ctx.fillStyle = 'green';
    ctx.fillRect(this.x,this.y,this.width,this.height);
  }
 
  left(){ return this.x}

  right(){ return this.x+this.width}

  top(){ return this.y}

  bottom(){ return this.y+this.height}
}

function checkGameOver(){
  const crashed = myObstacles.some(function(obstacle){
      return player.crashWith(obstacle);
  })

  if(crashed){
    myGameArea.stop();
    myGameArea.clear();
  }
}



function updateObstacles(){
  myGameArea.frames +=1;
  if (myGameArea.frames % 120 == 0){
      let minWidth = 80;
      let maxWidth = 160;
      let width = Math.floor(Math.random() * (maxWidth - minWidth + 1) + minWidth);
      let x = Math.floor(Math.random()*(canvas.width-maxWidth-4));
      myObstacles.push(new Obstacle(x,0,width,20));
    }
    for (i = 0; i < myObstacles.length; i++) {
      myObstacles[i].y += 2;
      myObstacles[i].update();
    }
}


//myGameArea.start();

window.addEventListener('keydown', (e) => {
  switch (e.keyCode) {
    case 37:
      player.x -= 10;
      if (player.x < 0) {
        player.x = 0;
      }
      console.log('move left');
      break;
    case 39:
      player.x += 10;
      if (player.x > 460) {
        player.x = 460;
      }
      break;
  }
  player.update();
});


