import { Ship, Gameboard, Player } from "./battleship.js";

let Sandree = new Player();
let ship = new Ship(2);
Sandree.board.place_ship_horizontal(ship, [5,5]);


let my_grid = document.getElementById("my_grid");
let enemy_grid = document.getElementById("enemy_grid");
for (let n=0;n<10;n++) {
    for (let m=0;m<10;m++) {
        let my_tile = Sandree.board.board[n][m];

        
        let div = document.createElement("div");
        if (my_tile !== 0) {
            div.style.backgroundColor = "cadetblue"
        } else if (my_tile === 0) {
            div.style.backgroundColor = "white";
        }
        my_grid.appendChild(div);
    }   
}