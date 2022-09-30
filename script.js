const xis = document.querySelector(".xis");
const bola = document.querySelector(".bola");
const quadrados = document.querySelectorAll('[class*="quadrado"]');
const selecao1 = document.querySelector(".selecao1");
const selecao2 = document.querySelector(".selecao2");
const resultado = document.querySelector(".resultado");

let jogador1;
let jogador2;
let rbola;
let rxis;
let sorteio = Math.round(Math.random()) < 0.5 ? 0 : 1;
function jogadorSorteio() {
  if (sorteio < 1) {
    jogador1 = bola;
    jogador2 = xis;
    selecao1.innerText = "o";
    selecao1.style.color = "blue";
    selecao2.innerText = "x";
    selecao2.style.color = "red";
    rbola = 1;
    rxis = 2;
  } else {
    jogador1 = xis;
    jogador2 = bola;
    selecao1.innerText = "x";
    selecao1.style.color = "red";
    selecao2.innerText = "o";
    selecao2.style.color = "blue";
    rbola = 2;
    rxis = 1;
  }
}

jogadorSorteio();

cliques = 0;
let numero = sorteio;

function adicionar() {
  for (let i = 0; i < quadrados.length; i++) {
    quadrados[i].addEventListener("click", selecao);
  }
}
adicionar();

function selecao() {
  this.removeEventListener("click", selecao);
  cliques += 1;
  numero += 1;

  if (numero % 2 === 0) {
    this.classList.add("ativo-xis");
    this.setAttribute("data-forma", "xis");
  } else {
    this.classList.add("ativo-bola");
    this.setAttribute("data-forma", "bola");
  }
  _Verificar();
}

function remover() {
  for (let i = 0; i < quadrados.length; i++) {
    quadrados[i].removeEventListener("click", selecao);
  }
}
/*let quadrados = document.querySelectorAll(".quadrado");
let numero = 0;
for (let i = 0; i < quadrados.length; i++) {
  quadrados[i].addEventListener("click", _Clicar_Quadrados);
}
function _Clicar_Quadrados() {
  this.removeEventListener("click", _Clicar_Quadrados);
  numero = numero + 1;
  if (numero % 2 === 0) {
    // console.log("xis")
    this.innerText = "X";
    this.setAttribute("data-forma", "xis");
  } else {
    // console.log("bolinha")
    this.innerText = "O";
    this.setAttribute("data-forma", "bola");
  }
  _Verificar();
}

function _Remover_Eventos_Quadrados() {
  for (let i = 0; i < quadrados.length; i++) {
    quadrados[i].removeEventListener("click", _Clicar_Quadrados);
  }
}*/

let verificarQuadrado = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let barraHorizontal = document.querySelector(".barra");

function _Verificar() {
  let vencedor = false;
  for (let i = 0; i < 8; i++) {
    let combinaçãoPossivel = verificarQuadrado[i];
    let resultados = [];
    let indicesMarcação = [];
    for (let j = 0; j < 3; j++) {
      resultados.push(
        quadrados[combinaçãoPossivel[j]].getAttribute("data-forma")
      );
      indicesMarcação.push(combinaçãoPossivel[j]);
    }
    if (resultados.every((_Forma) => _Forma === resultados[0])) {
      if (resultados[0] === "bola") {
        resultado.innerText = "Jogador " + rbola + " ganhou!";
      } else {
        resultado.innerText = "Jogador " + rxis + " ganhou!";
      }
      for (let j = 0; j < indicesMarcação.length; j++) {
        quadrados[indicesMarcação[j]].style.background = "yellow";
        vencedor = true;
      }
      remover();
      break;
    }
  }
  if (cliques === 9 && vencedor == false) {
    resultado.innerText = "Empatou!";
  }
}

const resetar = document.querySelector("button");

function reset() {
  // for (let i = 0; i < quadrados.length; i++) {
  //   quadrados[i].style.background = "";
  //   quadrados[i].setAttribute("data-forma", [i]);
  //   quadrados[i].classList.remove("ativo-xis");
  //   quadrados[i].classList.remove("ativo-bola");
  location.reload();
  adicionar();
}

resetar.addEventListener("click", reset);
