// Opdracht 1 t/m 7. [Klikken op "SEARCH"-knop geeft output voor 1 t/m 7.]
// Opdracht 1
// Maak een 'Zoek'-knop op de pagina en koppel deze aan een functie die de gegevens over België ophaalt
// en dit in de console logt. Tip: Als de de documentatie bekijkt en op async zoekt,
// vindt je een voorbeeld van een GET-request.
//
// Opdracht 2.
// Maak op basis van de response de volgende string en log dit in de console:
// [country-naam] is situated in [subarea-name]. It has a population of [amount] people.
//
// Opdracht 3.
// Maak op basis van de response de volgende string en log dit in de console: The capital is [city]
//
// Opdracht 4.
// Maak een functie die ongeacht het aantal currencies die in een land gebruikt worden, een string maakt.
// In een land kunnen één of twee currencies gebruikt worden:
//  - 1 valuta: and you can pay with [currency]'s
//  - 2 valuta's: and you can pay with [currency]'s and [currency]'s

// 1.1 In HTML: already for next assignments: text field for text to search for in the API
// 1.2 Add button in HTML script with type button en id="data-fetch-button". See HTML source code.

// 1.2 Declare async function
// 1.3 Try/catch block
// 1.4 Make the request with axios + await

// To check for other countries (assignment 5) use variable string:
const countryName = 'belgium';

// Opdracht 5.
// Check of alles nog steeds werkt als je de gegevens over Aruba of Duitsland ophaalt!
// Aruba: uncomment line 33 and comment line 28
// const countryName = 'aruba';

// Duitsland: uncomment line 36 and comment line 28
// const countryName = 'germany';

async function fetchDataBelgium() {
    try {
        const response = await axios.get(`https://restcountries.eu/rest/v2/name/${countryName}`);
        console.log(response.data[0]);

        const countryDetails  = response.data[0];

        // 2.1 Look for the correct variable names:
        // [country-naam] -> "name"
        // [subarea-name] -> "subregion"
        // [amount] -> "population"
        console.log(`${countryDetails.name} is situated in ${countryDetails.subregion}.\n\r` +
            `It has a population of ${countryDetails.population} people.`);

        // 3.1 Look for the correct variable name:
        // [city] -> "capital"
        console.log(`The capital is ${countryDetails.capital} ` +

            // 4.2 Look for the correct variable name:
            // [currency] -> "currencies"
            `${countryCurrencies(countryDetails.currencies)}`);

        // 6. test for "bonus-assignment" with function countryCurrencies
        console.log(countryLanguages(countryDetails.languages));

        // 7. test for country flag website
        console.log(countryDetails.flag);

        // Put flag in the document (test)
        document.getElementById("country-flag").src = countryDetails.flag;
        // Make the ancors for the different texts
        const countryNameContainer = document.getElementById('country-name');
        const countrySituationContainer = document.getElementById('country-situation');
        const countryCapitalContainer = document.getElementById('country-capital');
        const countryLanguagesContainer = document.getElementById('country-languages');
        // Make the HTML elements
        const countryNameElement = document.createElement('h1');
        const countrySituationElement = document.createElement('h3');
        const countryCapitalElement = document.createElement('h3');
        const countryLanguagesElement = document.createElement('h3');
        //  put data in the elements
        countryNameElement.textContent = countryDetails.name;
        countrySituationElement.textContent = `${countryDetails.name} is situated in ${countryDetails.subregion}.\n\r` +
            `It has a population of ${countryDetails.population} people.`;
        countryCapitalElement.textContent = `The capital is ${countryDetails.capital} ` +
            `${countryCurrencies(countryDetails.currencies)}`;
        countryLanguagesElement.textContent = countryLanguages(countryDetails.languages);
        // Add the elements to the ancors
        countryNameContainer.appendChild(countryNameElement);
        countrySituationContainer.appendChild(countrySituationElement);
        countryCapitalContainer.appendChild(countryCapitalElement);
        countryLanguagesContainer.appendChild(countryLanguagesElement);

    } catch (e) {
        console.error(e);
    }
}

// 1.5 Save reference HTML element
const button = document.getElementById('data-fetch-button');

// 1.6 Declare function to be fired by th event (is fetchData, already made)
// 1.7 Choose event to listen at ('click')
// 1.8 Make the Eventlistener
button.addEventListener('click', fetchDataBelgium);

// 4.1 Function with array (with length 1 or 2) as input and a string as output
function countryCurrencies(array) {
    if (array.length === 1) {
        return `and you can pay with ${array[0].name}'s`;
    } else return `and you can pay with ${array[0].name}'s and ${array[1].name}'s`;
}


// Opdracht 6.
// Bonusopdracht: Maak een functie die ongeacht het aantal talen die in een land gesproken worden, een string maakt:
// - 1 taal: They speak [language]
// - 2 talen: They speak [language] and [language]
// - 3 talen: They speak [language], [language] and [language]
// - etc.

// Function loops over the array (languages) and adapts the text depending on the amount of languages.
// Only 1 language (just that), 2 languages (" and " in between), 3 of more (separated with ", " and before last one an " and")
function countryLanguages(array) {
    let text = "They speak "
    for (let i = 0; i < array.length; i++) {
        text = text + array[i].name;
        if (i < array.length - 2) {
            text = text + ", ";
        }
        if (i === array.length - 2) {
            text = text + " and ";
        }
    }
    return text;
}

// Opdracht 7
// Zorg ervoor dat de opgehaalde data op de volgende manier wordt toegevoegd aan de DOM:
//  - [IMAGE: flag]
//  - [country-name]
//  - [country-naam] is situated in [subarea-name]. It has a population of [amount] people.
//  - The capital is [city] and you can pay with [currency]'s
//  - They speak [language], [language] and [language]


// Opdracht 8.
// Maak een inputveld op de pagina en zorg ervoor dat als de gebruiker op enter drukt, de functie wordt aangeroepen
// waarmee de gegevens over België worden opgehaald.

// already  made a SEARCH button to activate the function "fetchDataBelgium" see 1.5 and 1.8
// now we make an input text field
const inputElement = document.getElementById('data-fetch-field');


function handleInput(event) {
    console.log(event.target.value);
}

let typedText = '';
inputElement.addEventListener('keyup', (event) => {
    handleInput(event);
    if (event.key === 'Enter') {
        // check typed text after an Enter
        typedText = event.target.value;
        console.log(`typed text: ${typedText}`);
        fetchDataBelgium();
    }
});

// Opdracht 9.
// Zorg ervoor dat de waarde uit het input veld wordt gebruikt als query voor het GET request.
// Er moet alleen een request gedaan worden als de gebruiker op enter drukt, of op de zoek-knop klikt.
// Tip: gebruik een globale variabele.




// Opdracht 10.
// Zorg ervoor dat de waarde van het input veld wordt leeggemaakt na elke zoekopdracht.


// Opdracht 11.
// Zorg ervoor dat er altijd maar één zoekresultaat op de pagina staat.


// Opdracht 12.
// Zorg ervoor dat als er naar een land wordt gezocht dat niet bestaat, er een foutmelding in de DOM wordt gezet.
// Tip: als er een ongeldige API call wordt gemaakt, zal de response in het catch blok terecht komen.


// Opdracht 13.
// Zorg ervoor dat als je na een ongeldige API call weer een geldige API call maakt, de foutmelding verdwenen is.


// Opdracht 14.
// Bonusopdracht: make it look nice! 😍
