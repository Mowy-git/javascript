const {Gameboard, Ship, Player} = require("./battleship.js");

let board = new Gameboard();
let ship = new Ship(2);

test("Testing sunking ship to be Falsy", () => {
    expect(ship.isSunk()).toBeFalsy();
});

test("Testing to sunk ship", () => {
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBeTruthy();
});


test("Test receiving attack", () => {
    board.place_ship_horizontal(ship, [5,5]);
    board.receiveAttack([5,6]);
    expect(ship.hits).toBe(3);
});

test("Test missed shots", () => {
    board.receiveAttack([8,8]);
    expect(board.missed_shots).toBe(1);
});