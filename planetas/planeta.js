document.addEventListener("DOMContentLoaded", function() {
    const tabela = document.getElementById('customers');

    function adicionarPlanetaNaTabela(planeta) {
        let water = (planeta.surface_water !== "unknown") ? (100 - parseInt(planeta.surface_water)) : "unknown";

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${planeta.name}</td>
            <td>${planeta.diameter}</td>
            <td>${planeta.climate}</td>
            <td>${planeta.gravity}</td>
            <td>${planeta.surface_water}%</td>
            <td>${water}%</td>
        `;
        tabela.appendChild(tr);
    }

    function buscarPlanetas() {
        let paginas = [1, 2, 3, 4, 5, 6];
        paginas.forEach(pagina => {
            fetch(`https://swapi.dev/api/planets/?page=${pagina}`)
                .then(response => response.json())
                .then(data => {
                    data.results.forEach(planeta => {
                        adicionarPlanetaNaTabela(planeta);
                    });
                })
                .catch(error => console.error("Erro ao buscar planetas:", error));
        });
    }

    buscarPlanetas();
});
