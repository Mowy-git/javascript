function capitalize(string) {
    if (string.length == 0) return null;
    if (string.length == 1) return string.toUpperCase();
    return string[0].toUpperCase() + string.slice(1);
}

function reverse(string) {
    return Array.from(string).reverse().join("");
}

let calculator = {
    add: (first,second) => {return first + second},
    subtract: (first,second) => {return first - second},
    divide: (first,second) => {return first / second},
    multiply: (first,second) => {return first * second} 
}

function caesarCipher(string, num) {
    let alphabets = "abcdefghijklmnopqrstuvwxyz";
    alphabets = Array.from(alphabets).join(",").split(",");
    let newstring = "";
    for (let n=0; n<string.length;n++) {
        if (alphabets.includes(string[n].toLowerCase())) {
            let letter = alphabets.at(alphabets.indexOf(string[n].toLowerCase()) + num % alphabets.length);

            if (string[n] === string[n].toUpperCase()) {letter = letter.toUpperCase()}
            newstring += letter;
            continue;
        }
        newstring += string[n];
    }

    return newstring;
}

function analyzeArray(array) {
    let object = {
        average: 0,
        min: array[0],
        max: 0,
        length: array.length
    };

    for (let n=0;n<object.length;n++) {
        object.min = Math.min(array[n], object.min);
        object.max = Math.max(array[n], object.max);
        object.average += array[n];
    }
    object.average /= object.length;
    return object;
}

module.exports = {capitalize, reverse, calculator, caesarCipher, analyzeArray};