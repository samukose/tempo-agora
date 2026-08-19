# Clima Agora | React + Open-Meteo API

Uma aplicação web moderna e responsiva construída em React que permite consultar a previsão do tempo de qualquer cidade do mundo em tempo real. O diferencial do projeto é a interface dinâmica, que altera as cores do fundo e as informações de acordo com a condição climática retornada.

---

## Funcionalidades

- Busca por Cidade: Encontra coordenadas geográficas usando a API Nominatim (OpenStreetMap).
- Dados em Tempo Real: Exibe temperatura em °C, condição do tempo, umidade do ar e velocidade do vento via Open-Meteo API.
- UI Dinâmica: As cores de fundo (gradients) e textos mudam suavemente dependendo se o dia está ensolarado, nublado, chuvoso ou nevando.
- Design Responsivo e Glassmorphism: Interface limpa e centralizada com efeito de vidro fosco.
- Acessibilidade: Suporte a busca ao pressionar a tecla Enter.

---

## Tecnologias Utilizadas

- Frontend: React + Vite
- Linguagem: JavaScript (ES6+)
- Estilização: CSS3 puro (Flexbox, CSS Gradients e Glassmorphism)
- APIs Consumidas:
  - Open-Meteo API (Dados de clima - Sem necessidade de chave)
  - Nominatim OpenStreetMap (Geocodificação/Endereço)

---

## Como Executar o Projeto Localmente

### Pré-requisitos
Certifique-se de ter o Node.js instalado em seu computador.

### Passo a passo

1. Clone o repositório:
   ```bash
   git clone [https://github.com/samukose/tempo-agora.git](https://github.com/samukose/tempo-agora.git)
