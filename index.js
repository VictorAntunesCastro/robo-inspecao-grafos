const limiteBateria = 7000;
const alcanceCamera = 200;

// Histórico do robô
const verticesVisitados = [];

// Infraestrutura (Extraída do PDF)
const pesos = {
  0: 0,
  1: 15,
  2: 30,
  3: 10,
  4: 45,
};

const mapa = {
  0: [
    { destino: 1, distancia: 150 },
    { destino: 2, distancia: 250 },
  ],
  1: [
    { destino: 0, distancia: 150 },
    { destino: 3, distancia: 100 },
  ],
  2: [
    { destino: 0, distancia: 250 },
    { destino: 4, distancia: 200 },
  ],
  3: [{ destino: 1, distancia: 100 }],
  4: [{ destino: 2, distancia: 200 }],
};

function dfs(vertice, bateriaAtual) {
  verticesVisitados.push(vertice);
  const vizinhos = mapa[vertice];
  for (const vizinho of vizinhos) {
    if (
      !verticesVisitados.includes(vizinho.destino) &&
      bateriaAtual >= vizinho.distancia
    ) {
      console.log("Local novo! Posso explorar o vertice: ", vizinho.destino);
      dfs(vizinho.destino, bateriaAtual - vizinho.distancia);
    }
  }
}

dfs(0, limiteBateria);
