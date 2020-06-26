# gRPC

## O que é?

- gRPC é um arcabouço de alto desempenho para comunicação de processos distribuídos, desenvolvido pelo Google e tornado de e código aberto em 2015

- gRPC = gRPC Remote Procedure Call

- gRPC é composto por duas partes:
  - o protocolo gRPC
  - a serialização de dados

## Em que casos utilizar?

- Ideal para interconexão de microsserviços

- Aplicações móveis e navegadores a seu *backend*

- Geração das bibliotecas de código de forma automática

## Principais funcionalidades

- Bibliotecas clientes em 11 linguagens
  - C/C++
  - C#
  - Dart
  - Go
  - Java
  - Kotlin/JVM
  - Node.js
  - Objective-C
  - PHP (beta)
  - Python
  - Ruby

- Altamente eficiente nas transmissões e tem um arcabouço de definição de serviços simples

- *Streaming* bidirecional utilizando HTTP/2

- Tem suporte plugável para balanceamento de carga, rastreamento, monitoramento e autenticação

## HTTP/2

- Nome original: SPDY

- Lançado em 2015

- Dados trafegados são binários e não texto, como no HTTP/1.1

- Utiliza a mesma conexão TCP para enviar e receber dados do cliente e do servidor (multiplex)

- Server Push

- Cabeçalhos são comprimidos

- Gasta menos recursos da rede

- Processo é mais veloz

- Diferentes modos de operação:
  - "unary" API
  - server streaming
  - client streaming
  - bidirectional streaming

## Protocol Buffers

- "Protocol buffers are Google's language-neutral, platform-neutral, extensible mechanism for serializing structured data - think XML, but smaller, faster and simpler"

- Protocol buffers vs JSON
  - Arquivos binários < JSON
  - Processo de serialização mais leve do que o JSON
  - Gasta menos recursos da rede

- Formato proto3

## REST vs gRPC

- Texto/JSON /// Protocol buffers

- Unidirecional /// bidirecional e assíncrono

- Alta latência /// baixa latência

- Sem contrato (maior chance de erros) /// contrato definido

- Sem suporte a *streaming* (*request*/*response*) /// suporte a *streaming*

- Design é bem definido (GET, POST, etc.) /// design livre

- Bibliotecas de terceiros /// geração de código