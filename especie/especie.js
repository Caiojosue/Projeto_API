async function fetchSpecies(page) {
    const url = `https://swapi.dev/api/species/?page=${page}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
}

function createTableRow(species) {
    return `
        <tr>
            <td>${species.name}</td>
            <td>${species.classification}</td>
            <td>${species.average_lifespan}</td>
            <td>${species.language}</td>
        </tr>
    `;
}

async function loadSpecies() {
    const table = document.getElementById('customers');

    for (let page = 1; page <= 4; page++) {
        const speciesList = await fetchSpecies(page);
        speciesList.forEach(species => {
            table.innerHTML += createTableRow(species);
        });
    }
}

window.onload = loadSpecies;