async function buscarPersonagens(pagina = 1, filtroGenero = '') {
    let personagens = [];
    let url = `https://swapi.dev/api/people/?page=${pagina}`;

    let resultado = await fetch(url);
    let data = await resultado.json();

    data.results.forEach(personagem => {
        if (filtroGenero && personagem.gender !== filtroGenero) {
            return; 
        }

        personagens.push({
            nome: personagem.name,
            peso: personagem.mass,
            altura: personagem.height,
            genero: personagem.gender
        });
    });

    if (data.next) {
        const nextPage = new URL(data.next).searchParams.get("page");
        const nextPersonagens = await buscarPersonagens(nextPage, filtroGenero);
        personagens = [...personagens, ...nextPersonagens];
    }

    return personagens;
}

function exibirPersonagens(personagens) {
    const table = document.getElementById("customers");

    table.innerHTML = `
        <tr>
            <th>Nome</th>
            <th>Peso</th>
            <th>Altura</th>
        </tr>
    `;

    personagens.forEach(personagem => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <a href='./pesquisa-personagens/personagens.html?search=${encodeURIComponent(personagem.nome)}'>
                    ${personagem.nome}
                </a>
            </td>
            <td>${personagem.peso} kg</td>
            <td>${personagem.altura} cm</td>
        `;
        table.appendChild(row);
    });
}

async function carregarDados() {
    const urlParams = new URLSearchParams(window.location.search);
    const filtroGenero = urlParams.get('genero') || '';

    const personagens = await buscarPersonagens(1, filtroGenero);
    
    exibirPersonagens(personagens);
}

window.onload = carregarDados;