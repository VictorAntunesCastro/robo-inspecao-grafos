# Problema da Inspeção - Robô em Grafos

Este repositório contém a implementação em JavaScript (Node.js) de um algoritmo de grafos para resolver o "Problema da Inspeção". 

## Objetivo
Traçar a rota de um robô de inspeção em um mapa (grafo) de 25 vértices para maximizar a soma de pontos (pesos) dos vértices fotografados, respeitando os limites físicos do robô. O trajeto deve obrigatoriamente iniciar e terminar no Vértice 0.

## Regras e Restrições
- **Bateria:** O robô pode percorrer no máximo 7.000 cm.
- **Câmera:** O robô fotografa o vértice atual e os vizinhos com conexão direta até 200 cm de distância.
- **Pontuação:** Fotos duplicadas do mesmo vértice não somam pontos extras.

## Tecnologias
- JavaScript (Node.js)
