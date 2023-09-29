let mundoInicial = [
  [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
  [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
  [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
];

let mundoVacio = [];
let mundo = [];
let pacman = {};
let pacmanMuerte = {};
let bluey = {};
let pinky = {};
let redy = {};
let greeny = {};
let score = 0;
let vidas = 3;
let cont = 0;
crearMundo();

function crearMundo(){
  mundoVacio = mapaAleatorio(mundoInicial);
  [mundo, cantItems] = llenarMapa(mundoVacio);
  pacman = {
    x: 12,
    y: 9,
    direccion: 'r'
  }  

  bluey = {
    x: 1,
    y: 1
  };

  pinky = {
    x: 1,
    y: 13
  }

  redy = {
    x: 23,
    y: 13
  }

  greeny = {
    x: 23,
    y: 1
  }

  mostrarMundo();
  mostrarPacman();
  mostrarPinky();
  mostrarRedy();
  mostrarGreeny();
  mostrarBluey();
}

function reiniciarMundo(){
  location.reload();
}

function mostrarMundo(){
  let salida = '';

  for(let i=0;i<mundo.length;i++){
    salida += '<div class="fila">';
    for(let j=0;j<mundo[i].length;j++){
      if(mundo[i][j] === 2){
        salida += '<div class="bloque"></div>';
      }else if(mundo[i][j] === 1){
        salida += '<div class="pastilla"></div>';
      }else if(mundo[i][j] === 3){
        salida += '<div class="cereza"></div>';
      }else{
        salida += '<div class="vacio"></div>';
      }
    }
    salida += '</div>';
  }
  // console.log(salida);
  document.querySelector('.mundo').innerHTML = salida;
  document.querySelector('.puntaje').innerHTML = `<h2>Puntaje: ${score}</div>`;
  document.querySelector('.vidas').innerHTML = `<h2>Vidas: ${vidas}</div>`;
}
mostrarMundo();

function mostrarPacman(){
  document.querySelector('.pacman').style.top = `${pacman.y * 20}px`;
  document.querySelector('.pacman').style.left = `${pacman.x * 20}px`;
  perderVidasPacman();
}
mostrarPacman();

function mostrarPacmanMuerte(){
  document.querySelector('.pacman-muerte').style.top = `${pacman.y * 20}px`;
  document.querySelector('.pacman-muerte').style.left = `${pacman.x * 20}px`;
}

function mostrarBluey(){
  document.querySelector('.bluey').style.top = `${bluey.y * 20}px`;
  document.querySelector('.bluey').style.left = `${bluey.x * 20}px`;
}

function mostrarPinky(){
  document.querySelector('.pinky').style.top = `${pinky.y * 20}px`;
  document.querySelector('.pinky').style.left = `${pinky.x * 20}px`;
}

function mostrarRedy(){
  document.querySelector('.redy').style.top = `${redy.y * 20}px`;
  document.querySelector('.redy').style.left = `${redy.x * 20}px`;
}

function mostrarGreeny(){
  document.querySelector('.greeny').style.top = `${greeny.y * 20}px`;
  document.querySelector('.greeny').style.left = `${greeny.x * 20}px`;
}

setInterval(moverPinky, 350);
setInterval(moverRedy, 300);
setInterval(moverGreeny, 250);
setInterval(moverBluey, 200);

function moverBluey(){
  bluey = movimiento(bluey, mundo);
  mostrarBluey();
  perderVidas(bluey);
}

function moverPinky(){
  pinky = movimiento(pinky, mundo);
  mostrarPinky();
  perderVidas(pinky);
}

function moverRedy(){
  redy = movimiento(redy, mundo);
  mostrarRedy();
  perderVidas(redy);
}

function moverGreeny(){
  greeny = movimiento(greeny, mundo);
  mostrarGreeny();
  perderVidas(greeny);
}

function perderVidas(fantasma){
  if(fantasma.x === pacman.x && fantasma.y === pacman.y && vidas > 0){
    vidas--;
    animacionPerder();
    mostrarMundo();
  }
  if(vidas == 0){
    gameOver();
  }
}

function perderVidasPacman(){
  if(pinky.x === pacman.x && pinky.y === pacman.y && vidas > 0){
    vidas--;
    animacionPerder();
    mostrarMundo()
  }else if(redy.x === pacman.x && redy.y === pacman.y && vidas > 0){
    vidas--;
    animacionPerder();
    mostrarMundo()
  }else if(greeny.x === pacman.x && greeny.y === pacman.y && vidas > 0){
    vidas--;
    animacionPerder();
    mostrarMundo()
  }
  if(vidas == 0){
    gameOver();
  }
}

function gameOver(){
  let elementGameOver = document.querySelector('.game-over');
  elementGameOver.querySelector('.puntaje-final').innerText = `Puntaje Final ${score}`;
  let elementMundo = document.querySelector('.container');
  elementGameOver.classList.add('mostrar');
  elementMundo.classList.add('desenfocar');
}

function animacionPerder(){
  let elementPacman = document.querySelector('.pacman');
  let elementPacmanMuerte = document.querySelector('.pacman-muerte');
  elementPacman.classList.add('ocultar');
  mostrarPacmanMuerte();
  elementPacmanMuerte.classList.remove('ocultar');
  pacman = {
    x: 12,
    y: 9,
    direccion: pacman.direccion
  };
  setTimeout(function () {
    elementPacman.classList.remove('ocultar');
    elementPacmanMuerte.classList.add('ocultar');
    mostrarPacman();
  }, 2000);
}

document.onkeydown = function (e){
  if(e.key === 'ArrowDown'){
    if(mundo[pacman.y + 1][pacman.x] !== 2){
      pacman.y += 1;
    }    
  }else if(e.key === 'ArrowUp'){
    if(mundo[pacman.y - 1][pacman.x] !== 2){
      pacman.y -= 1;
    }
  }else if(e.key === 'ArrowRight'){
    if(mundo[pacman.y][pacman.x + 1] !== 2){
      if(pacman.direccion === 'l'){
        pacman.direccion = 'r';
        let elementPacman = document.querySelector('.pacman');
        elementPacman.classList.remove('pacman-left');
      }
      pacman.x += 1;
    }
  }else if(e.key === 'ArrowLeft'){
    if(mundo[pacman.y][pacman.x - 1] !== 2){
      if(pacman.direccion === 'r'){
        pacman.direccion = 'l';
        let elementPacman = document.querySelector('.pacman');
        elementPacman.classList.add('pacman-left');
      }
      pacman.x -= 1;
    }
  }
  if (mundo[pacman.y][pacman.x] == 1) {
    score += 2;
    cantItems--;
    console.log(cantItems);
    if(cantItems-1<1){
      setTimeout(crearMundo, 500);
    }
  } else if (mundo[pacman.y][pacman.x] == 3) {
    score += 50;
    cantItems--;
    console.log(cantItems);
    if(cantItems-1<1){
      setTimeout(crearMundo, 500);
    }
  }
  mundo[pacman.y][pacman.x]= 0;
  mostrarPacman();
  mostrarMundo();
}

function mapaAleatorio(mundo) {
  for (let y = 0; y < 15; y+=2) {
    for (let x = 0; x < 25; x++) {
      if (mundo[y][x] == 0) {
        let numeroAleatorio = Math.random();
        if (numeroAleatorio > 0.6) {
          mundo[y][x] = 2;
        }
      }
    }
  }
  return mundo;
}

function llenarMapa(mundo) {
  let contItems = 0;
  for (let y = 0; y < 15; y++) {
    for (let x = 0; x < 25; x++) {
      if (mundo[y][x] == 0) {
        contItems++;
        const numeroAleatorio = Math.random();
        if (numeroAleatorio < 0.2) {
          mundo[y][x] = 3;
        } else {
          mundo[y][x] = 1;
        }
      }
    }
  }
  mundo[9][12] = 0;
  return [mundo,contItems];
}

let move = "x";
let sentido = "-";

function movimiento(fantasma, mundo) {
  moverse();

  function moverse() {
    if (move == "y" && sentido == "-") {
      sentidoYMenos();
    } else if (move == "y" && sentido == "+") {
      sentidoYMas();
    } else if (move == "x" && sentido == "-") {
      sentidoXMenos();
    } else if (move == "x" && sentido == "+") {
      sentidoXMas();
    }
  }

  function sentidoYMenos() {
    if (mundo[fantasma.y - 1][fantasma.x] != 2) {
      fantasma.y--;
    } else {
      move = "x";
      sentidoRandom();
      moverse();
    }
  }

  function sentidoYMas() {
    if (mundo[fantasma.y + 1][fantasma.x] != 2) {
      fantasma.y++;
    } else {
      move = "x";
      sentidoRandom();
      moverse();
    }
  }

  function sentidoXMas() {
    if (mundo[fantasma.y][fantasma.x + 1] != 2) {
      fantasma.x++;
      cont++;
      if (cont === 10) {
        move = "y";
        sentidoRandom();
        moverse();
        cont = 0;
      }
    } else {
      move = "y";
      sentidoRandom();
      moverse();
    }
  }


  function sentidoXMenos() {
    
    if (mundo[fantasma.y][fantasma.x - 1] != 2) {
      fantasma.x--;
      cont++;
      if (cont === 10) {
        move = "y";
        sentidoRandom();
        moverse();
        cont = 0;
      }
    } else {
      move = "y";
      sentidoRandom();
      moverse();
    }
  }

  function sentidoRandom() {
    const numeroAleatorio = Math.random();
    if (numeroAleatorio < 0.5) {
      sentido = "+";
    } else {
      sentido = "-";
    }
  }

  return fantasma;
}

mostrarMundo();
mostrarPacman();
mostrarPinky();
mostrarRedy();
mostrarGreeny();
mostrarBluey();