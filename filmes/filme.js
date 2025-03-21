async function fetchFilms() {
    const url = "https://swapi.dev/api/films/";
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
}

async function fetchCharacter(name) {
    const url = `https://swapi.dev/api/people/?search=${name}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.results.length > 0;
}

async function filterFilmsByCharacter(films, characterName) {
    if (!characterName) return films;

    const filteredFilms = [];
    for (let film of films) {
        let foundCharacter = false;
        for (let characterUrl of film.characters) {
            const character = await fetchCharacter(characterName);
            if (character) {
                foundCharacter = true;
                break;
            }
        }
        if (foundCharacter) filteredFilms.push(film);
    }
    return filteredFilms;
}

function sortFilms(films, order) {
    if (order === 'cronologica') {
        return films.sort((a, b) => a.episode_id - b.episode_id);
    } else {
        return films.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
    }
}

function createTableRow(film) {
    return `
        <tr>
            <td>${film.title}</td>
            <td>${film.director}</td>
            <td>${film.producer}</td>
            <td>${film.opening_crawl}</td>
        </tr>
    `;
}

async function loadFilms() {
    const films = await fetchFilms();

    const order = document.getElementById('ordem').value;
    const characterName = document.getElementById('personagem').value.trim();

    let filteredFilms = await filterFilmsByCharacter(films, characterName);
    let sortedFilms = sortFilms(filteredFilms, order);

    const table = document.getElementById('customers');
    table.innerHTML = `
        <tr>
            <th>Título</th>
            <th>Diretor</th>
            <th>Produtor</th>
            <th>Texto de abertura</th>
        </tr>
    `;

    sortedFilms.forEach(film => {
        table.innerHTML += createTableRow(film);
    });
}

window.onload = loadFilms;

document.getElementById('filterForm').addEventListener('submit', (event) => {
    event.preventDefault();
    loadFilms();
});
