document.addEventListener("DOMContentLoaded", function() {
    const filtroGenero = document.getElementById('genero');
    const tabela = document.getElementById('customers');
    const filtroForm = document.getElementById('filter-form');

    function preencherTabela(personagens) {
        tabela.innerHTML = `
            <tr>
                <th>Nome</th>
                <th>Peso</th>
                <th>Altura</th>
            </tr>
        `;
        
        personagens.forEach(personagem => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><a href='./pesquisa-personagens/personagens.html?search=${encodeURIComponent(personagem.name)}'>${personagem.name}</a></td>
                <td>${personagem.mass} kg</td>
                <td>${personagem.height} cm</td>
            `;
            tabela.appendChild(tr);
        });
    }

    function buscarPersonagens(genero) {
        const paginas = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        const personagens = [];

        paginas.forEach(pagina => {
            fetch(`https://swapi.dev/api/people/?page=${pagina}`)
                .then(response => response.json())
                .then(data => {
                    data.results.forEach(personagem => {
                        if (!genero || personagem.gender === genero) {
                            personagens.push(personagem);
                        }
                    });

                    if (personagens.length === data.count) {
                        preencherTabela(personagens);
                    }
                })
                .catch(error => console.error("Erro ao buscar personagens:", error));
        });
    }

    buscarPersonagens('');

    filtroForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const generoSelecionado = filtroGenero.value;
        buscarPersonagens(generoSelecionado);
    });
});
