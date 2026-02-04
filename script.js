// logica verificador de idade
const idadeInput = document.getElementById('idadeInput');
const verifyButton = document.getElementById('idadeInput');
const resultado = document.getElementById('idadeInput');

function verificarIdade(){
    resultado.classList.remove('visivel');
    const idade = parseInt(idadeInput.value);
    let menssagem = '';

    if(isNaN(idade) || idade < 0){
        menssagem + 'Por favor, ensira uma idade válida';
    }else if(idade < 18){
        menssagem = 'Você é menor de idade.';
    }else if(idade < 60){
        menssagem = 'Você é adulto';
    }else{
        menssagem = 'Você é idoso';
    }

    setTimeout(() => {
        resultado.innerText = menssagem;
        resultado.classList.add(visivel);
    }, 100)
}

verifyButton.addEventListener('click', verificarIdade);
idadeInput.addEventListener('keyup', (event) => {
    if(event.key ===  'enter') verificarIdade();
});

// Animação do canvas
const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d'); // Contexto 2D, onde desenhamos
// ajusta o tamanho do canvas para o tamanho da janela
canvas.width = window.innerWidth;
canvas.height = window.innerWidth;

//objeto para armazenar a posição do mouse
let mouse = {
    x: null,
    y: null,
    radius: 150 //Área de influência do mouse
};

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
})

//Array para armazenar todas as partículas
let particulasArray = [];
const numeroDeParticulas = 100;

// Classe para criar cada partícula
class Particula{
    constructor(x, y, direcaoX, direcaoY, tamanho, cor){
        this.x = x;
        this.y = y;
        this.direcaoX = direcaoX;
        this.direcaoy = direcaoY;
        this.tamanho = tamanho;
        this.cor = cor;
    }


    // Método para desenhar a partícula no canvas
    desenhar(){
        ctx.beginpath();
        ctx.arc(this.x, this.y, this.tamanho, 0, Math.PI * 2, false);
        ctx.fillstyle = '#007bff';
        ctx.fill();
    }

    // Método para atualizar a posição da partícula
    atualizar(){
        //inverter a direção se a partículaatingir a borda da tela
        if(this.x > canvas.width || this.x < 0){
            this.direcaoX = -this.direcaoX;
        }
        if(this.y > canvas.width || this.y < 0){
            this,direcaoY = -this.direcaoY;
        }
        this.X += this.direcaoX;
        this.y += this.direcaoY;
        this.desenhar();
    }
}

// Função para criar o enxame de partículas
function init(){
    particulasArray = []
    for(let i = 0; i < numeroDeParticulas; i++){
        let tamanho = Math.random() * 2 + 1;
        let x = Math.random() * (innerWidth - tamanho * 2) + tamanho;
        let y = Math.random() * (innerHeight - tamanho * 2) + tamanho;
        let direcaoX = (Math.random() * 0.4) - 0.2;
        let direcaoY = (Math.random() * 0.4) - 0.2;
        let cor = '007bff';
        particulasArray.push(new Particula(x, y, direcaoX, direcaoY, tamanho, cor));
    }
}


// Função para conectar as partículas com linhas
function conectar(){
    for(let a = 0; a < particulasArray.length; a++) {
        for (let b = a; b < particulasArray.length; b++) {
            let distancia = ((particulasArray[a].x - particulasArray[b].x) * (particulasArray[a].x - particulasArray[b].x)) + ((particulasArray[a].y - particulasArray[b].y) * (particulasArray[a].y - particulasArray[b])); 

            // se a distância entre duas partículas for menor que um certo valor, desenha uma linha
            if(distancia < (canvas. width / 7) * (canvas.heigth / 7)){
                ctx.strokeStyle = `rgba(0, 123, 255, ${1 - (distancia/20000)})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particulasArray[a].x, particulasArray[a].y);
                ctx.moveTo(particulasArray[b].x, particulasArray[b].y);
                ctx.stroke();
            }
        }
    }
}

//loop de animação
function animar(){
    requestAnimationFrame(animar);
    ctx.clearRect(0, 0, innerWidth, innerHeight); //limpa o canvas cada frame

    for(let i = 0; i < particulasArray.length; i++){
        particulasArray[i].atualizar();
    }
    conectar();
}

// recria as partículas se a janela for redimensionada
window.addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});

//Garante que o mouse sai da área de efeito quando ele sai da janela
window.addEventListener('mouseout', () =>{
    mouse.x = undefined;
    mouse.y = undefined;
});

init();
animar();