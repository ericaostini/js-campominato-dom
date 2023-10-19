/* 
click button "Avvia Gioco" = visualizzo le celle sul playground
click singola cella sfondo blu e in console visualizzo indice casella
*/

/*
select per selezionare tipologia di difficoltà del gioco 
in base alla difficoltà scelta stamperò un numero di diverso di celle
*/

/*
Programma deve generare 16 numeri causali nello stesso range della difficoltà prescelta = le bombe (ogni qudratino è un numero, selezioni random 16 di questi numeri dove assegno la bomba)
*/

"use strict";
campoMinato();

/**
 * main function del gioco Campo Minato
 */
function campoMinato(){
    const btn = document.querySelector("button");
    
    btn.addEventListener("click", playGame);

    /**
     * funzione per riprodurre celle in base al livello selezionato
     */
    function playGame(){
        const numBombs = 16;
        const arrayBombs = [];
        const optionLiv = select.selectedIndex;
        console.log(optionLiv);
        const playground = document.getElementById("playground");
        playground.innerHTML = " ";
        let numberCell;
        switch (optionLiv){
            case 1:
                numberCell = 100;
                // ciclo for per visualizzare 100 celle 
                for (let i = 1; i <= numberCell; i++){
                    const squareEl = displayCell(numberCell, i,arrayBombs);
                    playground.append(squareEl); 
                };
                break;
            case 2:
                numberCell = 81;
                for (let i = 1; i <= numberCell; i++){
                    const squareEl = displayCell(numberCell, i,arrayBombs);
                    playground.append(squareEl);
                };
                break;
            case 3:
                numberCell = 49;
                for (let i = 1; i <= numberCell; i++){
                    const squareEl = displayCell(numberCell, i,arrayBombs);
                    playground.append(squareEl);
                };
                break;
            default:
                playground.innerHTML = `
                <div class="m-auto text-center text-light"> Seleziona un livello
                </div>
                `;
        };
        getNumBomb(numberCell, arrayBombs, numBombs);
    };


    /**
     * funzione genero un array contenente 16 numeri random corrispondendi alle posizioni delle bombe
     * @param {Number} numberCell 
     */
    function getNumBomb(numberCell, arrayBombs, numBombs){
            while(arrayBombs.length < numBombs){
                let bomb = getRandomInt(1, numberCell);
                console.log(bomb);
                if(!arrayBombs.includes(bomb)){
                    arrayBombs.push(bomb);
                    console.log(arrayBombs);
                }
            }
    }
    /**
     * funzione che crea un quadratino
     * @param {Number} numberCell 
     * @param {Number} IndexCell 
     * @returns {Object} quadrato creato 
     */
    function displayCell(numberCell, IndexCell,arrayBombs){
        const numCellSq = Math.sqrt(numberCell);
        let score = 0;
        // creo div che formerà la cella a cui assegno le rispettive classi
        const scorePoints = document.getElementById("score");
        let singCell = document.createElement("div");
        singCell.classList.add("cell");
        singCell.style.width = `calc(100% / ${numCellSq})`;
        singCell.style.height = `calc(100% / ${numCellSq})`;
        singCell.addEventListener("click", () => {
            console.log("L'indice della casella è: " + IndexCell);
            drawBomb(arrayBombs, IndexCell, singCell, numberCell); 
        },{once:true});
        return singCell;
    };

    function drawBomb(arrayBombs, IndexCell, singCell){
        if(arrayBombs.includes(IndexCell)){
            singCell.style.backgroundColor = "red";
            singCell.style.transition = "3s";
            singCell.classList.add("displayPlay");
            singCell.innerHTML = `<i class="fa-solid fa-bomb fa-beat"></i>`;
        } else{
            singCell.style.backgroundColor = "blue";
            singCell.style.transition = "1s";
            singCell.classList.add("displayPlay");
            singCell.innerHTML = IndexCell;
            arrayBombs.includes(IndexCell);
        }
    }
}

function checkScore(check, arrayBombs, singCell){
    if(check){
        for (let r = 0; r < arrayBombs.length; r++){
            singCell.style.backgroundColor = "red";
            singCell.classList.add("displayPlay");
            singCell.innerHTML = `<i class="fa-solid fa-bomb fa-beat"></i>`;
        }
    }
}
function gameOver(){

}
function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
};
