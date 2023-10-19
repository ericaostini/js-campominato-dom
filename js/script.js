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
        // creo div che formerà la cella a cui assegno le rispettive classi
        const scorePoints = document.getElementById("score");
        let singCell = document.createElement("div");
        singCell.classList.add("cell");
        singCell.style.width = `calc(100% / ${numCellSq})`;
        singCell.style.height = `calc(100% / ${numCellSq})`;
        singCell.addEventListener("click", () => {
            console.log("L'indice della casella è: " + IndexCell);
            checkBomb(arrayBombs, IndexCell, singCell);
        },{once:true});
        return singCell;
    };

    /**
     * funzione che controlla casella se è una bomba o un semplice numero
     * @param {Array} arrayBombs 
     * @param {number} IndexCell 
     * @param {Object} singCell 
     */
    let punteggio = 0;
    function checkBomb(arrayBombs, IndexCell, singCell){
        const score = document.getElementById("score");
        const bombs = document.querySelectorAll(".cell");   
        if(arrayBombs.includes(IndexCell)){
            singCell.classList.add("displayPlayOver");
            singCell.innerHTML = `<i class="fa-solid fa-bomb fa-beat"></i>`;
            for (let f = 0; f < bombs.length; f++){
                if(arrayBombs.includes(f+1)){
                    bombs[f].classList.add("displayPlayOver");
                    bombs[f].innerHTML = `<i class="fa-solid fa-bomb fa-beat"></i>`;
                    score.innerHTML = `
                    <div><i class="fa-solid fa-face-grin-tears fa-beat fa-xl" style="color: #fbf22f;"></i></div>
                    <div> GAME OVER!!</div>`;
                }
            }       
        } else{
            singCell.classList.add("displayPlayCon");
            singCell.innerHTML = IndexCell;
            punteggio++;
            score.innerHTML = `Il tuo punteggio è: ${punteggio}`;
        };
    }   
}



function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
};
