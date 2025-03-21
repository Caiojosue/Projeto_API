document.addEventListener("DOMContentLoaded", function() {
    const tabela = document.getElementById('customers').getElementsByTagName('tbody')[0];
    const url = "https://swapi.dev/api/species/";

    function adicionarEspecieNaTabela(especie) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${especie.name}</td>
            <td>${especie.classification}</td>
            <td>${especie.average_lifespan}</td>
            <td>${especie.language}</td>
        `;
        tabela.appendChild(tr);
    }

    function buscarEspecies() {
        fetch(url)
            .then(response => response.json())
            .then(data => {

                tabela.innerHTML = '';

                data.results.forEach(especie => {
                    adicionarEspecieNaTabela(especie);
                });
            })
            .catch(error => {
                console.error("Erro ao buscar espécies:", error);
            });
    }

    function buscarEspeciePorNome(nome) {
        fetch(url)
            .then(response => response.json())
            .then(data => {

                tabela.innerHTML = '';

                const especieEncontrada = data.results.find(especie => especie.name.toLowerCase() === nome.toLowerCase());

                if (especieEncontrada) {
                    adicionarEspecieNaTabela(especieEncontrada);
                } else {
                    tabela.innerHTML = `
                        <tr>
                            <td colspan="4">Infelizmente, não encontramos a espécie procurada. Tente novamente!</td>
                        </tr>
                    `;
                }
            })
            .catch(error => {
                console.error("Erro ao buscar espécie:", error);
            });
    }

    const params = new URLSearchParams(window.location.search);
    const search = params.get('search');

    if (search) {
        buscarEspeciePorNome(search);
    } else {
        buscarEspecies();
    }
});
