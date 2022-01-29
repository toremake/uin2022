// TODO: Bruk getElementById til å hente HTML-elementene med #id
const main = document.getElementById("main");
const desc = document.getElementById("desc");
const guess = document.getElementById("guess");
const numbers = document.getElementById("numbers");

//TMA: Lager min/max-verdier for tall som skal genereres for sortering:
const minValue = 0;
const maxValue = 100;
const numberOfNumbers = 5;

// TODO: Bruk querySelector til å hente knappen
const button = document.querySelector("button");

// TODO: Lag en liste med tallene som skal sorteres
const numberList = [];
const makeRandom = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
for (let i = 0; i < numberOfNumbers; i++) {
    numberList.push(makeRandom(minValue, maxValue));
}
//console.log(numberList);
//TMA: Lager en sortert versjon av arrayen som kan brukes som fasit
const sortedNumbers = numberList.slice().sort((a, b) => {
    return a - b;
});
//console.log(sortedNumbers);

// TODO: Lag en funksjon for å skrive ut tallene som skal sorteres
const writeNumbers = () => {
    numberList.forEach((num) => {
        const numLi = document.createElement("li");
        numLi.innerHTML = num;
        numbers.appendChild(numLi);
    });
};

writeNumbers();
// TODO: Lag en funksjon for å skrive ut input felter bruker kan skrive tallene i
const makeInputs = () => {
    for (let i = 0; i < numberList.length; i++) {
        const inputLi = document.createElement("li");
        const input = document.createElement("input");
        input.type = "number";
        input.id = `sort-order-${i}`;
        input.value = i;
        input.setAttribute("min", minValue);
        input.setAttribute("max", maxValue);
        inputLi.appendChild(input);
        guess.appendChild(inputLi);
    }
};
makeInputs();

// TODO: Lag en funksjon for å hente ut det brukeren har skrevet inn
// TMA: Lagrer bruker-input i en array kalt userNumberOrder, returnerer denne
const fetchUserInput = () => {
    const userNumberOrder = [];
    const userValues = document.querySelectorAll("input");
    userValues.forEach((input) => {
        userNumberOrder.push(parseInt(input.value));
    });
    return userNumberOrder;
};
// TODO: Lag en funksjon for å sjekke om tallene er sortert riktig av bruker
const checkNumberSeq = () => {
    //TMA: Resetter stil for inputs
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
        input.style.borderColor = "#ccc";
    });
    //TMA: Klargjør feilteller, brukerinputarray og css for inputs med feil
    let wrongs = 0;
    const userGuesses = fetchUserInput();
    const error = "border: 2px solid red";
    //TMA: Sjekker om sortedNumbers (array med fasit) matcher brukerInput tall for tall.
    for (let i = 0; i < numberOfNumbers; i++) {
        if (sortedNumbers[i] !== userGuesses[i]) {
            //TMA: Markerer input med feil og teller opp antall feil
            document.querySelector("#sort-order-" + i).style.cssText = error;
            wrongs = wrongs + 1;
        }
    }
    //TMA: Hvis wrongs er 0 er alle riktig...
    if (wrongs === 0) {
        console.log("Sorteringen er riktig!");
        desc.innerHTML = "Bra! Alle tallene er riktig sortert!";
    } else {
        //...hvis ikke, skriver vi ut hvor mange feil som må rettes opp!
        console.log("Beklager, tallene er ikke sortert riktig!");
        desc.innerHTML = `Beklager, du har ${wrongs} feil. De er markert nedenfor. Rett opp feilene og prøv igjen!`;
    }
};
// TODO: Lag en funksjon som "lager UI" --Nødvendig?
// TMA: Nei...

// TODO: Lytt til 'click'-event og trigg checkNumberSeq ved klikk
document.querySelector("button").addEventListener("click", checkNumberSeq);