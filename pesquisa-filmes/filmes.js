document.addEventListener("DOMContentLoaded", function() {
    const tabela = document.getElementById('customers').getElementsByTagName('tbody')[0];
    const url = "https://swapi.dev/api/films/";

    function formatarData(data) {
        const partes = data.split("-");
        const meses = [
            "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
            "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
        ];
        const mes = meses[parseInt(partes[1]) - 1];
        return `${partes[2]} de ${mes} de ${partes[0]}`;
    }

    function adicionarFilmeNaTabela(filme) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${filme.title}</td>
            <td>${filme.episode_id}</td>
            <td>${filme.opening_crawl}</td>
            <td>${filme.director}</td>
            <td>${filme.producer}</td>
            <td>${formatarData(filme.release_date)}</td>
        `;
        tabela.appendChild(tr);
    }

    function buscarFilmes() {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                tabela.innerHTML = '';
                data.results.forEach(filme => {
                    adicionarFilmeNaTabela(filme);
                });
            })
            .catch(error => console.error("Erro ao buscar filmes:", error));
    }

    function buscarFilmePorTitulo(titulo) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                tabela.innerHTML = '';
                const filmeEncontrado = data.results.find(filme => filme.title.toLowerCase() === titulo.toLowerCase());

                if (filmeEncontrado) {
                    adicionarFilmeNaTabela(filmeEncontrado);
                } else {
                    tabela.innerHTML = `
                        <tr>
                            <td colspan="6">Infelizmente, não encontramos o filme procurado. Tente novamente!</td>
                        </tr>
                    `;
                }
            })
            .catch(error => console.error("Erro ao buscar filme:", error));
    }

    const params = new URLSearchParams(window.location.search);
    const search = params.get('search');

    if (search) {
        buscarFilmePorTitulo(search);
    } else {
        buscarFilmes();
    }
});
