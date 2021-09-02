// import axios
const axios = require('axios');

// just a little test to see if it works with "fetchData"
async function fetchData() {
    try {
        const result = await axios.get('https://restcountries.eu/rest/v2/name/belgium?fullText=true');
        console.log(result);
    } catch(e) {
        console.error(e);
    }
}

fetchData();

