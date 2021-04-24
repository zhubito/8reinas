var tablero = document.getElementById('tablero');
var tableroLogico;
var posicionReinas = [];

function CrearTablero() {
    //Obtenemos tablero logico
    tableroLogico = LlenarTablero();
    //Limpiamos tablero
    tablero.innerHTML = "";
    // Crea un elemento <table> y un elemento <tbody>
    var tabla = document.createElement("table");
    var tblBody = document.createElement("tbody");

    for (var i = 0; i < 8; i++) {
        var hilera = document.createElement("tr");

        for (var j = 0; j < 8; j++) {
            var celda = document.createElement("td");
            celda.id = "c" + i + "_" + j;
            celda.classList.add("cuadro");
            if ((i % 2 == 0 && j % 2 == 1) || (j % 2 == 0 && i % 2 == 1)) {
                celda.classList.add("color1");
            } else{
                celda.classList.add("color2");
            }
            celda.setAttribute("onclick","clickeo(this);");//Agregar evento onclick
            if(tableroLogico[i][j]==1){
                var img = document.createElement('img');
                img.src = "img/reina.png";
                celda.appendChild(img);
            }
            hilera.appendChild(celda);
        }

        tblBody.appendChild(hilera);
    }

    tabla.appendChild(tblBody);
    tablero.appendChild(tabla);
    tabla.setAttribute("border", "1");

}

//Función para obtener posición de reinas
function EncuentraReinas(){
    posicionReinas.remove();
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            if( document.getElementById("c"+i+"_"+j).innerHTML!=""){
                posicionReinas.push(i+"/"+j);
            }
        }
    }
}

//Función de verificación de posición 
function VerificarTablero(){
    let gano = true;
    for (let i = 0; i < posicionReinas.length; i++) {
        let posicionEvaluada = posicionReinas[i].split('/');
        let pintado = false;
        let x = posicionEvaluada[0];
        let y = posicionEvaluada[1];
        for (let j = 0; j < posicionReinas.length; j++) {
            if(j != i){
                let posicionEnContra = posicionReinas[j].split('/');
                let x2 = posicionEnContra[0];
                let y2 = posicionEnContra[1];
                if((x == x2) || (y == y2)){ //Estan en la misma columna o fila
                   document.getElementById("c"+x+"_"+y).firstChild.src = "img/reina_roja.png";//pintamos la reina
                   pintado = true;
                   gano = false;
                    //Deberia hacer que no siga procesando esta etapa.
                }
                if(((x - y) == (x2 - y2)) || (x - y2) == (x2 - y)){//verificar diagonales
                    document.getElementById("c"+x+"_"+y).firstChild.src = "img/reina_roja.png";//pintamos la reina
                    pintado = true;
                    gano = false;
                }
            }
        }
        if(!pintado){
            document.getElementById("c"+x+"_"+y).firstChild.src = "img/reina.png";//la reina no choca con otra
        }
    }
    //Verificamos si gano
    if(posicionReinas.length == 8 && gano){
        alert('Felicitaciones Ganaste!!, ahora intenta encontrar otra combinación')
    }
}

//Función creadora de estructura
function TableroLimpio(){
    var arrayBidimensional= new Array(8);
    for (var i = 0; i < 8; i++) {
        arrayBidimensional[i] = new Array(8);
    }
    //rellenamos
    arrayBidimensional.forEach( function(valor, indice, array) {
        for (var i = 0; i < 8; i++) {
            arrayBidimensional[indice][i] = 0;
        }
    });
    
    return arrayBidimensional;
}

//Llenar tablero
function LlenarTablero(){
    tableroLogico = TableroLimpio();
    return tableroLogico;
}

function clickeo(elem){
    if(elem.firstChild != null){
        elem.innerHTML = "";//quitamos reina
    } else {
        var img = document.createElement('img');
        img.src = "img/reina.png";
        elem.appendChild(img);
    }
    EncuentraReinas();
    VerificarTablero();
}

//Función limpiadora de array
Array.prototype.remove =
  Array.prototype.remove ||
  function () {
    this.splice(0, this.length);
  };

//Iniciando
window.onload = function () {
    CrearTablero();
};