#  Problema da Inspeção — Robô em Grafos

Implementação em **JavaScript (Node.js)** de um algoritmo de grafos que resolve o "Problema da Inspeção", proposto no 1º trabalho de **Algoritmos em Grafos** (Prof. André Renato, 2026.2).

##  O problema

Uma empresa química tem uma rede de distribuição de gás que precisa ser inspecionada por um robô remotamente controlado. A rede é modelada como um grafo:

- **Vértices** = junções da tubulação (25 no total, numeradas de 0 a 24), cada uma com um **peso** que indica sua importância na vistoria.
- **Arestas** = tubulações, cada uma com uma **distância em centímetros**.

**Objetivo:** traçar a rota do robô que maximize a **soma dos pesos das junções fotografadas**.

##  Regras e restrições

| Regra | Descrição |
|---|---|
| Início e fim | O robô sai do **vértice 0** e deve terminar nele. |
| Bateria (**D**) | Pode percorrer no máximo **D cm** (valor inicial: 7000). |
| Câmera (**K**) | Fotografa o vértice onde está e os vizinhos com **ligação direta** a até **K cm** (valor inicial: 200). |
| Pontuação | Fotos repetidas da mesma junção contam **uma vez só**. |

##  Como o algoritmo funciona

A solução usa **DFS com backtracking** (busca em profundidade com retrocesso):

1. O robô começa no vértice 0, com a bateria cheia.
2. Em cada vértice, ele **fotografa** o próprio vértice e os vizinhos dentro do alcance K (somando o peso só se ainda não foram fotografados).
3. Em seguida, tenta **seguir para cada vizinho** que ainda não está na rota atual e cuja aresta caiba na bateria restante.
4. Ao **voltar ao vértice 0**, a rota é fechada: se a pontuação for a maior até agora, ela é guardada junto com o caminho e a distância gasta.
5. Ao terminar de explorar um vértice, ele é removido da rota (*backtrack*) e a busca testa outro caminho.

O grafo é guardado como **lista de adjacência** (`mapa`), e os pesos em `pesos`. A função principal é `testarRobo(D, K)`, que recebe a bateria e o alcance da câmera como parâmetros.

##  Como executar

Requisito: [Node.js](https://nodejs.org/) instalado.

```bash
git clone <url-do-repositorio>
cd robo-inspecao-grafos
node index.js   # ajuste para o nome do seu arquivo
```

Para testar outros valores, edite as chamadas no final do arquivo:

```js
testarRobo(7000, 200);   // cenário base
testarRobo(10000, 200);  // aumento só da bateria (D)
testarRobo(10000, 300);  // aumento de bateria (D) e câmera (K)
```

##  Resultados

| D (cm) | K (cm) | Pontuação | Distância percorrida |
|---|---|---|---|
| 7000 | 200 | **115** | 5482 cm |
| 10000 | 200 | **115** | 5482 cm |
| 10000 | 300 | **116** | 4523 cm |

**Melhor rota do cenário base (D=7000, K=200):**

```
0 → 1 → 2 → 3 → 15 → 18 → 13 → 14 → 4 → 5 → 6 → 7 → 11 → 9 → 8 → 10 → 12 → 17 → 19 → 21 → 20 → 22 → 23 → 0
```

### Análise

- **Aumentar só a bateria (D) não melhorou** a pontuação: o algoritmo já esgota as rotas possíveis antes de a bateria acabar.
- **Aumentar o alcance da câmera (K) melhorou** o resultado (115 → 116) e ainda **encurtou a rota** (5482 → 4523 cm), pois o robô fotografa vizinhos sem precisar passar por eles.
- A soma de todos os pesos do grafo é **116**, então esse é o **teto**: nenhum aumento de D ou K pode passar disso.

##  Limitações

- **Não repete vértices** (exceto o 0). Por isso o resultado é um *limite inferior*: no cenário base existe uma rota com 116 pontos que passa duas vezes pelo vértice 12 (`... 10 → 12 → 16 → 12 → 17 ...`), que este algoritmo não considera.
- A foto à distância vale apenas para **vizinhos diretos** (ligados por aresta) com distância ≤ K.
- O custo cresce de forma **exponencial** com o tamanho do grafo (o problema é uma variação do *Orienteering Problem*, NP-difícil). Neste grafo esparso são ~68 mil chamadas recursivas e leva cerca de 0,1 s, mas grafos maiores exigiriam poda ou outra técnica.
- O grafo está **escrito direto no código**, e não lido de arquivo.

##  Possíveis melhorias

- Permitir **revisitar vértices**, usando memorização de estados (vértice + conjunto de fotografados) para manter o desempenho.
- **Podar** rotas que não têm mais bateria para voltar ao vértice 0.
- **Ler o grafo de um arquivo** no formato do enunciado (N, pesos, arestas).

##  Tecnologias

- JavaScript (Node.js)