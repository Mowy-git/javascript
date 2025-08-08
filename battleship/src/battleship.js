class Ship {
    constructor(length) {
        this.length = length;
        this.hits = 0;
    }

    hit() {
        this.hits++;
    }

    isSunk() {
        if (this.hits === this.length) {
            return true;
        }
        return false;
    }
}

class Gameboard {
    //9row 11column
    constructor() {
        this.board = [];
        this.#create_board();
        this.ships_added = 0;
        this.ships_sunk = 0;
        this.missed_shots = 0;
    }

    #create_board() {
        for (let n=0;n<10;n++) {
            let array = [];
            for (let n=0;n<10;n++) {
                array.push(0);
            }
            this.board.push(array);
        }
    }

    place_ship_horizontal(ship, board_start) {
        let column_start = board_start[0];
        let row_start = board_start[1];
        let row_end = board_start[0] + ship.length;
        
        for (;row_start<row_end;row_start++) {
            this.board[column_start][row_start] = ship;
        }
        this.ships_added += 1;
    }

    place_ship_vertical(ship, board_start) {
        let column_start = board_start[0];
        let row_start = board_start[1];
        let column_end = board_start[0] + ship.length;
        
        for (;column_start<column_end;column_start++) {
            this.board[column_start][row_start] = ship;
        }
        this.ships_added += 1;
    }

    receiveAttack(coordinates) {
        let tile = this.board[coordinates[0]][coordinates[1]];

        if (!(tile instanceof Ship)) {
            this.missed_shots += 1; 
            return;
        }

        tile.hit();
        if (tile.isSunk()) this.ships_sunk += 1;
    }

    print_board() {
        for (let n=0;n<10;n++) {
            let string = "";
            for (let m=0;m<10;m++) {
                if (this.board[n][m]) {
                    string += "1 ";
                    continue;
                }
                string += this.board[n][m] + " ";
            }
            console.log(string);
        }
    }
}

class Player {
    constructor() {
        this.board = new Gameboard();

    }
}

export { Ship, Gameboard, Player }
