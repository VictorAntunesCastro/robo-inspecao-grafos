const pesos = {
  0: 0, 1: 5, 2: 7, 3: 2, 4: 4, 5: 10, 6: 5, 7: 3, 8: 8, 9: 1, 10: 9, 
  11: 9, 12: 6, 13: 4, 14: 2, 15: 7, 16: 1, 17: 4, 18: 1, 19: 5, 20: 10, 
  21: 3, 22: 2, 23: 2, 24: 6
};

const mapa = {
  0: [{ destino: 1, distancia: 202 }, { destino: 23, distancia: 224 }, { destino: 24, distancia: 275 }],
  1: [{ destino: 0, distancia: 202 }, { destino: 2, distancia: 215 }, { destino: 15, distancia: 219 }],
  2: [{ destino: 1, distancia: 215 }, { destino: 3, distancia: 221 }],
  3: [{ destino: 2, distancia: 221 }, { destino: 5, distancia: 214 }, { destino: 14, distancia: 212 }, { destino: 15, distancia: 275 }],
  4: [{ destino: 6, distancia: 222 }, { destino: 14, distancia: 210 }, { destino: 5, distancia: 293 }, { destino: 11, distancia: 216 }],
  5: [{ destino: 6, distancia: 249 }, { destino: 3, distancia: 214 }, { destino: 4, distancia: 293 }],
  6: [{ destino: 5, distancia: 249 }, { destino: 4, distancia: 222 }, { destino: 7, distancia: 246 }],
  7: [{ destino: 6, distancia: 246 }, { destino: 8, distancia: 238 }, { destino: 11, distancia: 298 }],
  8: [{ destino: 7, distancia: 238 }, { destino: 9, distancia: 216 }, { destino: 10, distancia: 309 }],
  9: [{ destino: 11, distancia: 189 }, { destino: 8, distancia: 216 }, { destino: 12, distancia: 243 }],
  10: [{ destino: 12, distancia: 214 }, { destino: 8, distancia: 309 }],
  11: [{ destino: 13, distancia: 189 }, { destino: 4, distancia: 216 }, { destino: 9, distancia: 189 }, { destino: 7, distancia: 298 }],
  12: [{ destino: 16, distancia: 206 }, { destino: 10, distancia: 214 }, { destino: 9, distancia: 243 }, { destino: 19, distancia: 389 }, { destino: 17, distancia: 222 }],
  13: [{ destino: 18, distancia: 192 }, { destino: 14, distancia: 237 }, { destino: 11, distancia: 189 }, { destino: 16, distancia: 210 }],
  14: [{ destino: 3, distancia: 212 }, { destino: 4, distancia: 210 }, { destino: 13, distancia: 237 }],
  15: [{ destino: 3, distancia: 275 }, { destino: 18, distancia: 213 }, { destino: 1, distancia: 219 }],
  16: [{ destino: 12, distancia: 206 }, { destino: 13, distancia: 210 }, { destino: 20, distancia: 216 }],
  17: [{ destino: 19, distancia: 234 }, { destino: 12, distancia: 222 }],
  18: [{ destino: 24, distancia: 194 }, { destino: 15, distancia: 213 }, { destino: 13, distancia: 192 }],
  19: [{ destino: 17, distancia: 234 }, { destino: 21, distancia: 245 }, { destino: 12, distancia: 389 }],
  20: [{ destino: 16, distancia: 216 }, { destino: 22, distancia: 294 }, { destino: 21, distancia: 222 }, { destino: 24, distancia: 271 }],
  21: [{ destino: 19, distancia: 245 }, { destino: 20, distancia: 222 }],
  22: [{ destino: 23, distancia: 262 }, { destino: 20, distancia: 294 }],
  23: [{ destino: 0, distancia: 224 }, { destino: 22, distancia: 262 }, { destino: 24, distancia: 224 }],
  24: [{ destino: 18, distancia: 194 }, { destino: 0, distancia: 275 }, { destino: 23, distancia: 224 }, { destino: 20, distancia: 271 }]
};

function testarRobo(limiteBateria, alcanceCamera) {
  const verticesVisitados = [];
  let melhorPontuacao = 0;
  let melhorCaminho = [];
  let distanciaGasta = 0;
  
  function dfs(vertice, bateriaAtual, pontuacaoAtual, fotosTiradas) {
    verticesVisitados.push(vertice);
    
    if (!fotosTiradas.includes(vertice)) {
      fotosTiradas.push(vertice);
      pontuacaoAtual = pontuacaoAtual + pesos[vertice];
    }
    
    if (vertice == 0 && verticesVisitados.length > 1) {
      if (pontuacaoAtual > melhorPontuacao) {
        melhorPontuacao = pontuacaoAtual;
        melhorCaminho = [...verticesVisitados];
        distanciaGasta = limiteBateria - bateriaAtual;
      }
    } 
    else {
      const vizinhos = mapa[vertice];
      
      for (const vizinho of vizinhos) {
        if (vizinho.distancia <= alcanceCamera && !fotosTiradas.includes(vizinho.destino)) {
          fotosTiradas.push(vizinho.destino);
          pontuacaoAtual = pontuacaoAtual + pesos[vizinho.destino];
        }
      }
      
      for (const vizinho of vizinhos) {
        if (
          (!verticesVisitados.includes(vizinho.destino) || vizinho.destino == 0) &&
          bateriaAtual >= vizinho.distancia
        ) {
          dfs(vizinho.destino, bateriaAtual - vizinho.distancia, pontuacaoAtual, [...fotosTiradas]);
        }
      }
    }
    
    verticesVisitados.pop();
  }

  dfs(0, limiteBateria, pesos[0], [0]);

  console.log(`\n--- Teste com Bateria (D) = ${limiteBateria} e Câmera (K) = ${alcanceCamera} ---`);
  console.log("Melhor Caminho Encontrado: ", melhorCaminho.join(" -> "));
  console.log("Distância Total Percorrida: ", distanciaGasta, "cm");
  console.log("Maior Pontuação: ", melhorPontuacao);
}

// Execução dos testes
testarRobo(7000, 200);  // Cenário base
testarRobo(10000, 200); // Aumento exclusivo da bateria (D)
testarRobo(10000, 300); // Aumento de bateria (D) e câmera (K)