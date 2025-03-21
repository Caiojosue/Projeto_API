document.addEventListener("DOMContentLoaded", function() {
    const tabela = document.getElementById('customers').getElementsByTagName('tbody')[0];
    const url = "https://swapi.dev/api/starships/";

    function adicionarNaveNaTabela(nave) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${nave.name}</td>
            <td>${nave.model}</td>
            <td>${nave.starship_class}</td>
            <td>${nave.manufacturer}</td>
            <td>${nave.length}m</td>
            <td>${nave.passengers}</td>
            <td>${nave.max_atmosphering_speed} km/h</td>
        `;
        tabela.appendChild(tr);
    }

    function buscarNaves() {
        let paginas = [1, 2, 3, 4]; 
        paginas.forEach(pagina => {
            fetch(`${url}?page=${pagina}`)
                .then(response => response.json())
                .then(data => {
                    data.results.forEach(nave => {
                        adicionarNaveNaTabela(nave);
                    });
                })
                .catch(error => console.error("Erro ao buscar naves:", error));
        });
    }

    function buscarNavePorNome(nome) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                tabela.innerHTML = '';

                const naveEncontrada = data.results.find(nave => nave.name.toLowerCase() === nome.toLowerCase());

                if (naveEncontrada) {
                    adicionarNaveNaTabela(naveEncontrada);
                } else {
                    tabela.innerHTML = `
                        <tr>
                            <td colspan="7">Infelizmente, não encontramos a nave procurada. Tente novamente!</td>
                        </tr>
                    `;
                }
            })
            .catch(error => console.error("Erro ao buscar nave:", error));
    }

    const params = new URLSearchParams(window.location.search);
    const search = params.get('search');

    if (search) {
        buscarNavePorNome(search);
    } else {
        buscarNaves();
    }
});
