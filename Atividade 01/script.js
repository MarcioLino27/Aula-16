async function fazerRequisicoes() {
    const urls = [
    'https://newsapi.org/v2/top-headlines?country=us&apiKey=6af0c41fcad641d8ad924d01495bd0e0', // Principais notícias dos EUA
    'https://newsapi.org/v2/top-headlines?country=br&apiKey=6af0c41fcad641d8ad924d01495bd0e0', // Principais notícias do Brasil
    'https://newsapi.org/v2/everything?q=technology&apiKey=6af0c41fcad641d8ad924d01495bd0e0' // Notícias relacionadas a tecnologia
    ];

try {
    const requisicoes = urls.map(url => fetch(url).then(res => res.json()));
                
    const respostas = await Promise.all(requisicoes);
                
    const divResultados = document.getElementById('resultados');
                
    respostas.forEach((resposta, index) => {
        const tituloSecao = document.createElement('h2');
        tituloSecao.textContent = `Resultado ${index + 1}`;
        divResultados.appendChild(tituloSecao);
                    
        if (resposta.articles) {
            resposta.articles.forEach(article => {
                const titulo = document.createElement('h3');
                titulo.textContent = `Título: ${article.title}`;

                const descricao = document.createElement('p');
                descricao.textContent = `Descrição: ${article.description || 'Sem descrição'}`;

                const link = document.createElement('a');
                link.href = article.url;
                link.textContent = 'Leia mais';
                link.target = '_blank';

                divResultados.appendChild(titulo);
                divResultados.appendChild(descricao);
                divResultados.appendChild(link);
                divResultados.appendChild(document.createElement('hr'));
            });
        } else {
            const mensagemErro = document.createElement('p');
            mensagemErro.textContent = 'Nenhum artigo encontrado.';
            divResultados.appendChild(mensagemErro);
                }
            });

        } catch (erro) {
            const divResultados = document.getElementById('resultados');
            const mensagemErro = document.createElement('p');
            mensagemErro.textContent = 'Erro ao fazer as requisições: ' + erro;
            divResultados.appendChild(mensagemErro);
        }
    }
    
    fazerRequisicoes();