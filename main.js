const tablero = document.getElementById("tablero");
const yo = document.getElementById("yo");
const puntaje = document.getElementById("punto");

let dato=0;
const ubicPosibles = () =>{
    let numero = Math.floor(Math.random()*3)*50;
    while(dato==numero){
        numero = Math.floor(Math.random()*3)*50;
    }
    dato=numero;
    return numero;
}

function pIzq(){
    return parseInt(window.getComputedStyle(yo).getPropertyValue("left"));
}
let miUbucacionLeft= pIzq();


document.addEventListener("keydown",movimientos);

function movimientos(e){
    let key = e.key;
    if(key=="ArrowRight" && miUbucacionLeft<100){
        yo.style.left= (miUbucacionLeft+50)+"px";
        miUbucacionLeft=pIzq();
        console.log(miUbucacionLeft)
    }
    if(key=="ArrowLeft" && miUbucacionLeft>0){
        yo.style.left= (miUbucacionLeft-50)+"px";
        miUbucacionLeft=pIzq();
        console.log(miUbucacionLeft)
    }
}


class Pared{
    constructor(elemento){
        this.elemento=elemento;
        this.bajando=false;
    }
}

let objetos = [];

for(let i=0;i<6;i++){
    let elem = document.createElement("div");
    elem.classList.add("pared");
    elem.style.top=-50+"px";
    tablero.append(elem);
    let obj = new Pared(elem);
    objetos.push(obj);
}


const intervalo = setInterval(movimiento,1);
velocidad=3;
let punto=0;
let contador=0;
let vuelta = 0;
let velocidadIteracion=60;
function movimiento(){
    contador+=1;
    if(contador>velocidadIteracion){
        let encontrar = objetos.find(x=>x.bajando==false)
        encontrar.bajando=!encontrar.bajando;
        encontrar.elemento.style.left=ubicPosibles()+"px";
        contador=0;
    }
    for(let i=0;i<objetos.length;i++){
        let posicionAltura = parseInt(window.getComputedStyle(objetos[i].elemento).getPropertyValue("top"));
        if(posicionAltura>650){
            objetos[i].bajando=!objetos[i].bajando;
            objetos[i].elemento.style.top=-50+"px";
            punto+=1;
            puntaje.innerHTML=punto;
            if(punto==10){
                velocidad=5;
            }
            if(punto==70){
                velocidad=7;
                velocidadIteracion=40
            }
        }
        if(objetos[i].bajando){
            objetos[i].elemento.style.top=(posicionAltura+velocidad)+"px";
            if( posicionAltura<600 && posicionAltura>500){
                let posicionLeft = parseInt(window.getComputedStyle(objetos[i].elemento).getPropertyValue("left"));
                if(miUbucacionLeft==posicionLeft){
                    clearInterval(intervalo);
                    document.removeEventListener("keydown",movimientos);
                    console.log("perdiste")
                }
            }
        }
    }
}
