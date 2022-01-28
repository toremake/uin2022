const users = [
    { id: 0, name: "Trude", age: 77 },
    { id: 1, name: "Simen", age: 85 },
    { id: 2, name: "Lars", age: 99 },
    { id: 3, name: "Ali", age: 34 },
    { id: 4, name: "Finn", age: 60 },
    { id: 5, name: "Kåre", age: 70 },
    { id: 6, name: "Hanne", age: 20 },
    { id: 7, name: "Åse", age: 21 },
    { id: 8, name: "Anne", age: 6 },
    { id: 9, name: "Amanda", age: 31 },
    { id: 10, name: "Morgan", age: 87 }
];

const userUl = document.getElementById("users");

const createTableUI = (users) => {
    userUl.innerHTML = null;
    userUl.innerHTML += `<li><span>Id</span><span>Navn</span><span>Alder</span></li>`;
    for (const user of users) {
        userUl.innerHTML += `<li><span>${user.id}</span><span>${user.name}</span><span>${user.age}</span></li>`;
    }
};

// TODO: Lag en funksjon som kan brukes til å skrive ut HTMLen for å se brukerene. Du kan bruke users importert over for å hente en liste med 10 brukere
/* TMA: Denne funksjonen ligger her allerede?! er det ikke nøyaktig det createTableUI er?
   Jeg har basert løsningen på dette, og gjenbruker createTableUI() med ulike parametere
   basert på ønsket funksjonalitet.
   */

/* SØKEFUNKSJON */
//TMA: Henter input-elementet som tar imot søkestreng
const searchInput = document.getElementById("name");
//TMA: oppretter funksjon som kjører når vi slipper opp tast i søkeboks
const searchFilter = () => {
    //TMA: Tar imot verdi i søkeboks, gjør lowercase for å matche alle bokstaver
    const searchString = searchInput.value.toLowerCase();
    //TMA: Forbereder en filtrert users-array
    const filteredUsers = [];
    //TMA: Løper gjennom brukerarrayen...
    users.forEach((user) => {
        //...henter navn på bruker, og gjør det lowercase...
        const username = user.name.toLocaleLowerCase();
        //...sjekker om det inkluderer søkestrengen, og gjør det det...
        if (username.includes(searchString)) {
            //...setter vi det inn i filteredUsers-arrayen!
            filteredUsers.push(user);
        }
        //TMA: Hvis filteredUsers har en eller flere rader, genererer vi tabell med filteredUsers-brukerne
        //(siden de matcher søkestrengen)...
        if (filteredUsers.length > 0) {
            createTableUI(filteredUsers);
        } else {
            //...ellers skriver vi ut hele tabellen som ved starten!
            main();
        }
    });
};
//Kjører søkefunksjon ved tasteslipp i søkeboks.
searchInput.addEventListener("keyup", searchFilter);

/* FILTERFUNKSJON */
//TMA: Lager funksjon som kjører for å finne filtertreff basert på innsendt alder
const ageFilter = (age) => {
    //forberede array for treff
    const filteredUsers = [];
    //løpe gjennom brukere, hvis eldre enn "age", legg i filteredUsers-array
    users.forEach((user) => {
        if (user.age >= age) {
            filteredUsers.push(user);
        }
    });

    //Hvis ingen brukere matcher filteret, skriv ut melding om dette
    if (filteredUsers.length === 0) {
        let msg = document.createElement("p");
        msg.setAttribute("id", "noresult");
        msg.innerHTML = `Ingen brukere matcher filteret ditt (${age} år)`;
        document.getElementById("main").append(msg);
    }
    //Disable filterknapp - siden filtrering er aktiv
    document.getElementById("filter").disabled = true;
    //Lag knapp for å tømme filter
    const unfilter = document.createElement("button");
    unfilter.setAttribute("id", "unfilter");
    unfilter.innerHTML = "Tøm filter";
    document.getElementById("ageWrapper").append(unfilter);
    //Hvis det finnes filtrerte brukere, skriv dem ut
    if (filteredUsers.length > 0) {
        createTableUI(filteredUsers);
    }
};
//lytter etter klikk på createdElement unfilter (tøm filter-knapp)
document.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target && e.target.id === "unfilter") {
        //Ved klikk, fjern knappen, gjør filter-felt tomt og aktiver filter-knapp
        document.getElementById("unfilter").remove();
        document.getElementById("filter").disabled = false;
        document.getElementById("age").value = "";
        //fjern melding om at det ikke finnes treff (dersom den er tilstede)
        const msg = document.getElementById("noresult");
        if (msg) {
            msg.remove();
        }
        main();
    }
});
//Lytt til klikk på filter-knapp. Hvis trykket, sjekk at det faktisk er skrevet et tall i filter-feltet
document.getElementById("filter").addEventListener("click", () => {
    if (document.getElementById("age").value === "") {
        alert("Vennligst fyll inn alder først");
        document.getElementById("age").focus();
    } else {
        ageFilter(document.getElementById("age").value);
    }
});

//Startfunksjon, ligger i template-koden fra starten av.
const main = () => {
    createTableUI(users);
};

main();