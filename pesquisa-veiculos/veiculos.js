document.addEventListener('DOMContentLoaded', () => {
    const search = new URLSearchParams(window.location.search).get('search');
    const table = document.getElementById('customers');
    const apiUrls = [
        "https://swapi.dev/api/vehicles/",
        "https://swapi.dev/api/vehicles/?page=2",
        "https://swapi.dev/api/vehicles/?page=3",
        "https://swapi.dev/api/vehicles/?page=4"
    ];

    let array_name = [];
    let array_model = [];
    let array_vehicle_class = [];
    let array_length = [];
    let array_passengers = [];
    let array_cargo_capacity = [];

    async function fetchData() {
        for (let url of apiUrls) {
            const response = await fetch(url);
            const data = await response.json();

            data.results.forEach(veiculo => {
                array_name.push(veiculo.name);
                array_model.push(veiculo.model);
                array_vehicle_class.push(veiculo.vehicle_class);
                array_length.push(veiculo.length);
                array_passengers.push(veiculo.passengers);
                array_cargo_capacity.push(veiculo.cargo_capacity);
            });
        }
        
        let verificado = false;
        for (let i = 0; i < array_name.length; i++) {
            if (search === array_name[i]) {
                verificado = true;
                table.innerHTML = `
                    <tr>
                        <th>Nome</th>
                        <td>${array_name[i]}</td>
                    </tr>
                    <tr>
                        <th>Modelo</th>
                        <td>${array_model[i]}</td>
                    </tr>
                    <tr>
                        <th>Classe</th>
                        <td>${array_vehicle_class[i]}</td>
                    </tr>
                    <tr>
                        <th>Tamanho</th>
                        <td>${array_length[i]}m</td>
                    </tr>
                    <tr>
                        <th>Passageiros</th>
                        <td>${array_passengers[i]}</td>
                    </tr>
                    <tr>
                        <th>Carga Máx.</th>
                        <td>${array_cargo_capacity[i]}</td>
                    </tr>
                `;
                break;
            }
        }

        if (!verificado) {
            table.innerHTML = "<center><br><br><br><h2>Infelizmente não encontramos o veículo procurado! :/</h2><h4>Procure novamente!</h4></center><br><br>";
        }
    }

    fetchData();
});
