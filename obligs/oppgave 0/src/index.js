// Oppgave 1
document.getElementById("remove-btn").addEventListener("click", function() {
    //TMA: Oppgaveteksten beskriver ikke spesifikt hvordan det skal fjernes, så mitt valg var å fjerne DOM-elementet.
    // Fordi dette er små oppgaver har jeg ikke laget variabler som inneholder elemenetene før jeg benytter dem (ala const returnBtn etc)
    // Kan også tømme HTML-elementet med document.getElementById("remove").innerHTML = "" dersom vi er avhengige av å beholde elementet i DOM til senere.
    document.getElementById("remove").remove();
});
// Oppgave 2
document.getElementById("change-btn").addEventListener("click", function() {
    document.getElementById("change").innerHTML =
        "Dette er teksten jeg valgte. Hilsen Marius.";
});
// Oppgave 3
const input = document.getElementById("input");
const inputText = document.getElementById("input-text");
input.addEventListener("keyup", function() {
    //TMA: Setter også teksten tilbake til utgangspunktet dersom input tømmes
    if (input.value === "") {
        inputText.innerHTML =
            "Skriv ut teksten i input-boksen her når du skriver noe";
    } else {
        inputText.innerHTML = input.value;
    }
});
// Oppgave 4
const myList = ["item one", "item two", "item three"];

//TMA: funksjon som kalles i eventlistener
//Inneholder for-løkke som looper gjennom elementene i myList, bygger en variabel med
//HTML som skrives ut i <ul id="ul">. Kunne også vært løst på DOM-måten med createElement.
function createList() {
    var listhtml = "";
    for (let i = 0; i < myList.length; i++) {
        listhtml += "<li>" + myList[i] + "</li>";
    }
    document.getElementById("ul").innerHTML = listhtml;
}
//TMA: eventlistener på knapp som kjører funksjonen.
document.getElementById("write-list").addEventListener("click", createList);

// Oppgave 5
//TMA: Forbereder elmenter
const tagSelector = document.getElementById("select");
const text = document.getElementById("text");
const createTagButton = document.getElementById("create");
//TMA: Funksjon som lager og skriver ut HTML basert på valgt tag og innskrevet tekst (sendt inn som parametere).
//     skriver ut til #placeholder
function createTag(tag, text) {
    document.getElementById("placeholder").innerHTML =
        "<" + tag + ">" + text + "</" + tag + ">";
}
//TMA: eventlistener på knapp, kjører createTag-funksjonen.
createTagButton.addEventListener("click", function() {
    createTag(tagSelector.value, text.value);
});

// Oppgave 6
const rmBtn = document.getElementById("remove-li");
//TMA: Oppgaven kan også tolkes som at selve li-elementet skal fjernes fra ul-en
const removeLis = () => {
    const list = document.getElementById("list");
    //TMA: Husket ikke syntax eller metodenavn for å fjerne barne-elementer, så her hentet jeg
    // inspirasjon fra Googlesøk som ledet meg til https://www.w3schools.com/JSREF/met_node_removechild.asp
    if (list.children.length > 1) {
        list.removeChild(list.lastElementChild);
    } else {
        list.removeChild(list.lastElementChild);
        //TMA: Når du fjerner siste elementet, vil knappen deaktiveres.
        rmBtn.innerHTML = "Du har fjernet alle liste-elementene";
        rmBtn.disabled = true;
    }
};
//TMA: eventlistener på knapp, kjører removeLis for å fjerne listelementer.
rmBtn.addEventListener("click", removeLis);

// Oppgave 7
//TMA: Jeg satt både disabled og stil for egen øving og testing av cssText-propertien.
const inputName = document.getElementById("name");
const orderBtn = document.getElementById("order");

const nameController = () => {
    //Henter streng fra input for hvert knappe-oppslipp
    const nameString = inputName.value;
    //Setter stilregler
    const disabledStyle = "border: 1px solid red;";
    //Hvis streng fra input er lenger enn 4 karakter, disable knapp og sett stil
    if (nameString.length > 4) {
        orderBtn.disabled = true;
        orderBtn.style.cssText = disabledStyle;
    } else {
        //TMA: Tilbakestiller knapp dersom input er 4 tegn eller mindre.
        orderBtn.disabled = false;
        orderBtn.style = null;
    }
};
//TMA: eventlistener på knapp som sjekker knappe-oppslipp og kjører nameController-funksjonen.
inputName.addEventListener("keyup", nameController);

// Oppgave 8
//TMA egen hjelpetekst: oddetalls-li grønn, partalls-li pink border
const liColorBtn = document.getElementById("color");
//TMA: Henter ut eneste element med klassen children. Sikkert ikke mest fornuftige måte å gjøre det på,
//men tror diskusjonen her også kan gå på om en klasse er det riktige å bruke som CSS-selector (selv om jeg antar det er for øvelse) :)
const colorList = document.getElementsByClassName("children")[0];
//TMA: Samler alle <li>-elementer inni elementet deklarert over i en array
const colorListElements = colorList.getElementsByTagName("li");

//TMA: Lager en funksjon som looper gjennom <li>-elementene.
//Bruker modulus for å sjekke om elementene er delelige på 2 uten rest, og avgjøre
//om de er odd-/partall
//Finnes det noen ren JavaScript-måte å selecte nth-child på ala CSS? Dette ville antagelig vært en
//mindre ressurskrevende operasjon.
const makeColors = () => {
    for (let i = 0; i < colorListElements.length; i++) {
        if ((i + 1) % 2 === 0) {
            colorListElements[i].style = "border: 1px solid red";
        } else {
            colorListElements[i].style = "border: 1px solid green";
        }
    }
};

//Kaller makeColors-funksjonen for å sette stil på listeelementene.
liColorBtn.addEventListener("click", makeColors);