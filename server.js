const express = require('express');
const https   = require('https');
const path    = require('path');

const app     = express();
const URL_API = 'https://rickandmortyapi.com/api/character';

// Serve os arquivos estáticos da pasta (index.html, imagens, etc.)
app.use(express.static(path.join(__dirname)));

// Busca os personagens na API do Rick and Morty
function buscarPersonagens(callback) {
  https.get(URL_API, (resposta) => {
    let dados = '';
    resposta.on('data', parte => { dados += parte; });
    resposta.on('end', () => {
      const json = JSON.parse(dados);
      callback(json.results);  // results é um Array com 20 personagens
    });
  });
}

// GET /personagens -> retorna a lista de personagens
app.get('/personagens', (req, res) => {
  buscarPersonagens(personagens => {
    res.json(personagens);
  });
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});