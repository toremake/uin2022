//TMA: Klargjør spillvariabler
let feil = 0;
let ordteller = 0;
let ordgjettet = 0;
let brukerord = [];

//TMA: Lager en liste med ord som skal gjettes
//10 ord, stigende vanskelighetsgrad
const ord = [
    "Spillbart",
    "Fantasifigur",
    "Søppeltømmedag",
    "Klimahysterikere",
    "Brukerveiledning",
    "Skjørbuksmedisin",
    "Forfatterkonferanse",
    "Forurensningsmystikk",
    "Konspirasjonsteorier",
    "Multiplikasjonsutfordringer"
];
//TMA: Henter HTML-elementer
const ordplass = document.getElementById("word");
const bokstaver = document.getElementById("letter");
const feilplass = document.getElementById("wrongs");
const antallRiktig = document.getElementById("words-guessed");
const htmlbody = document.getElementById("body");

//TMA: Initierer ny runde. Sender med ordteller (ot) for å se hvor langt
//i ord-arrayen spilleren er kommet
const nyRunde = (ot) => {
    console.log('Ny runde med ordet "' + ord[ot] + '"!');
    //Sett brukerord-arrayen til å være tom ved start av nytt ord
    brukerord = [];
    //Skriv ut gjetningsordet basert på ordteller (hvor mange ord har vi klart)
    ordplass.innerHTML = ord[ot]
};
//TMA: Funksjon som kjøres for å sjekke ord mot spillerens klikkede bokstav
//sender med ordteller for å vite hvilket ord fra ordarray vi sjekker mot.
const bokstavSjekk = (bokstav, ot) => {
    //TMA: Lager en array av bokstavene i ordet, og gjør alle bokstavene lowercase
    const ordArray = Array.from(ord[ot].toLowerCase());
    //TMA: Skriver ut spillerens klikkede bokstav (som stor bokstav for tydelighet)
    bokstaver.innerHTML = bokstav.toUpperCase();
    //TMA: Gjør brukerens trykkede bokstav lowercase for å garantere treff selv om Caps Lock er aktiv
    bokstav.toLowerCase();
    //TMA: Lagrer antall bokstaver bruker har tastet riktig i bokstavPlass.
    const bokstavPlass = brukerord.length;
    //TMA: Sjekk om tastet bokstav er lik bokstaven på denne plassen i ordet som skal gjettes
    if (bokstav === ordArray[bokstavPlass]) {
        //TMA: Hvis ja, sett bokstaven inn i brukerord-arrayen
        brukerord.push(bokstav);
        //TMA: Hvis brukeren har skrevet riktig antall riktige bokstaver:
        if (brukerord.length === ordArray.length) {
            //TMA: Oppdater antall gjettede ord:
            ordgjettet = ordgjettet + 1;
            //TMA: Hvis antall ord skrevet riktig er lik lengden på ord som kan skrives...
            if (ordgjettet === ord.length) {
                //...vslutt spillet...
                finishGame();
            } else {
                //...ellers, hvis det fortsatt er flere ord å skrive,
                //oppdater antall ord gjettet og ordteller, og kjør i gang ny runde med nytt ord.
                antallRiktig.innerHTML = ordgjettet;
                //kjør ny runde
                ordteller += 1;
                nyRunde(ordteller);
            }
        }
    }
    //TMA: Hvis spillerens tastete bokstav ikke matcher bokstaven i ordet som skal skrives, oppdater feil-telleren.
    else {
        feil++;
        feilplass.innerHTML = feil;
    }
};

//TMA: Samlefunksjon for bygging av avslutningsbilde.
function finishGame() {
    /* Oppretter to HTML-elementer, en div som legges over spillet,
     * med gratulerer-tekst, resultater, og en spill-igjen-knapp
     */
    const wonOverlay = document.createElement("div");
    wonOverlay.setAttribute("id", "overlay");
    wonOverlay.innerHTML = `<h1>Gratulerer!</h1>
  <p>Du har klart alle 10 ordene med kun ${feil} gale tastetrykk! Butterfingers!</p>`;
    const restartKnapp = document.createElement("button");
    restartKnapp.setAttribute("id", "again");
    restartKnapp.innerHTML = "Spill igjen?";
    wonOverlay.append(restartKnapp);
    htmlbody.appendChild(wonOverlay);
}

//TMA: EventListener for tastaturtrykk, som kjører bokstavSjekk-funksjonen.
document.addEventListener("keyup", (e) => {
    bokstavSjekk(e.key, ordteller);
});

//TMA: EventListener som sjekker om spill igjen-knappen trykkes, resett spillet
document.addEventListener("click", (e) => {
    if (e.target && e.target.id == "again") {
        document.getElementById("overlay").remove();
        ordteller = 0;
        feil = 0;
        ordgjettet = 0;
        nyRunde(ordteller);
    }
});

//TMA: EventListener for å sjekke om startknapp er trykket.
document.querySelector("button").addEventListener("click", (e) => {
    e.currentTarget.disabled = true;
    nyRunde(ordteller);
});