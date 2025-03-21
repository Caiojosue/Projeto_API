document.addEventListener("DOMContentLoaded", function() {
    const tabela = document.getElementById('customers');

    function adicionarVeiculoNaTabela(veiculo) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${veiculo.name}</td>
            <td>${veiculo.model}</td>
            <td>${veiculo.vehicle_class}</td>
            <td>${veiculo.manufacturer}</td>
            <td>${veiculo.max_atmosphering_speed} km/h</td>
            <td>${veiculo.length} m</td>
            <td>${veiculo.passengers}</td>
            <td>${veiculo.cargo_capacity} kg</td>
        `;
        tabela.appendChild(tr);
    }

    function buscarVeiculos() {
        let paginas = [1, 2, 3, 4];
        paginas.forEach(pagina => {
            fetch(`https://swapi.dev/api/vehicles/?page=${pagina}`)
                .then(response => response.json())
                .then(data => {
                    if (data.results && data.results.length > 0) {
                        data.results.forEach(veiculo => {
                            adicionarVeiculoNaTabela(veiculo);
                        });
                    }
                })
                .catch(error => console.error("Erro ao buscar veículos:", error));
        });
    }

    buscarVeiculos();
});
