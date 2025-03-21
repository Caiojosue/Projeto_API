document.addEventListener("DOMContentLoaded", function() {
    const tabela = document.getElementById('customers').getElementsByTagName('tbody')[0];
    const url = "https://swapi.dev/api/planets/";

    function adicionarPlanetaNaTabela(planeta) {
        let water = planeta.surface_water !== "unknown" ? (100 - parseInt(planeta.surface_water)) : "unknown";

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${planeta.name}</td>
            <td>${planeta.diameter}</td>
            <td>${planeta.population}</td>
            <td>${planeta.climate}</td>
            <td>${planeta.surface_water}</td>
            <td>${water}</td>
        `;
        tabela.appendChild(tr);
    }

    function buscarPlanetas() {
        let paginas = [1, 2, 3, 4, 5, 6]; 
        paginas.forEach(pagina => {
            fetch(`${url}?page=${pagina}`)
                .then(response => response.json())
                .then(data => {
                    data.results.forEach(planeta => {
                        adicionarPlanetaNaTabela(planeta);
                    });
                })
                .catch(error => console.error("Erro ao buscar planetas:", error));
        });
    }

    function buscarPlanetaPorNome(nome) {
        let paginas = [1, 2, 3, 4, 5, 6]; 
        let planetaEncontrado = null;

        paginas.some(pagina => {
            fetch(`${url}?page=${pagina}`)
                .then(response => response.json())
                .then(data => {
                    planetaEncontrado = data.results.find(planeta => planeta.name.toLowerCase() === nome.toLowerCase());

                    if (planetaEncontrado) {
                        tabela.innerHTML = '';
                        adicionarPlanetaNaTabela(planetaEncontrado);
                        return true; 
                    }
                })
                .catch(error => console.error("Erro ao buscar planeta:", error));

            return planetaEncontrado !== null; 
        });

        if (!planetaEncontrado) {
            tabela.innerHTML = `
                <tr>
                    <td colspan="6">Infelizmente, não encontramos o planeta procurado. Tente novamente!</td>
                </tr>
            `;
        }
    }

    const params = new URLSearchParams(window.location.search);
    const search = params.get('search');

    if (search) {
        buscarPlanetaPorNome(search);
    } else {
        buscarPlanetas();
    }
});
