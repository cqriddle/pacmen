var pos = 0;
const pacArray = [
    ['PacMan1.png', 'PacMan2.png'],
    ['PacMan3.png', 'PacMan4.png']
];
var direction = 0;
const pacMen = []; // This array holds all the pacmen

function setToRandom(scale) {
    return {
        x: Math.random() * scale,
        y: Math.random() * scale
    }
}
// Factory to make a PacMan at a random position with random velocity
function makePac() {
  // returns an object with random values scaled {x: 33, y: 21}
  let velocity = setToRandom(10);
  let position = setToRandom(200);
  let mouthOpen = Math.round(Math.random());
  let face = [0, mouthOpen];
  // Add image to div id = game
  let game = document.getElementById('game');
  let newimg = document.createElement('img');
  newimg.style.position = 'absolute';
  newimg.src = pacArray[face[0]][face[1]];
  newimg.width = 100;
  game.appendChild(newimg);
  
  return {
      position,
      velocity,
      face,
      newimg
  }
}

function update() {
    //loop over pacmen array and move each one and move image in DOM
    pacMen.forEach((item) => {
        checkCollisions(item)            
        item.position.x += item.velocity.x;
        item.position.y += item.velocity.y;

        item.newimg.style.left = item.position.x + 'px';
        item.newimg.style.top = item.position.y + 'px';

        
        item.newimg.src = pacArray[item.face[0]][item.face[1]];            
    })
    setTimeout(update, 50); 
}

function checkCollisions(item) {
  
  if (item.face[1] === 0) {
    item.face[1] = 1;
  } else {
    item.face[1] = 0;
  }

  if (item.position.x + item.velocity.x + item.newimg.width > window.innerWidth || item.position.x + item.velocity.x < 0) {
    item.velocity.x = -item.velocity.x;
    
  if (item.face[0] === 0) {
      item.face[0] = 1;
    } else {
      item.face[0] = 0;
    }
  }

  if (item.position.y + item.velocity.y + item.newimg.height > window.innerHeight || item.position.y + item.velocity.y < 0) {
    item.velocity.y = -item.velocity.y;
  }
}

function makeOne() {
    pacMen.push(makePac()); // add a new PacMan
}