async function fetchStarships(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

function sortStarshipsByPassengers(starships) {
    return starships.sort((a, b) => {
        return parseInt(a.passengers) - parseInt(b.passengers);
    });
}

function createTableRow(starship) {
    return `
        <tr>
            <td>${starship.name}</td>
            <td>${starship.model}</td>
            <td>${starship.starship_class}</td>
            <td>${starship.max_atmosphering_speed}</td>
            <td>${starship.cargo_capacity}</td>
            <td>${starship.passengers}</td>
        </tr>
    `;
}

async function loadStarships() {
    const table = document.getElementById('customers');
    const url = "https://swapi.dev/api/starships/";
    let allStarships = [];
    let nextUrl = url;

    while (nextUrl) {
        const data = await fetchStarships(nextUrl);
        allStarships = allStarships.concat(data.results);
        nextUrl = data.next;
    }

    allStarships = sortStarshipsByPassengers(allStarships);

    allStarships.forEach(starship => {
        table.innerHTML += createTableRow(starship);
    });
}

window.onload = loadStarships;
