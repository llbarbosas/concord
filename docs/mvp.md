<h1 align="center">
  quarentena-chat MVP :package:
</h1>

<p align="center">
  <a href="#rocket-objetivos-do-projeto">Objetivos do projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#pencil-requisitos">Requisitos</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-restrições">Restrições</a>
</p>

## :rocket: Objetivos do projeto
* Praticar aprendizados de websockets utilizando socket.io
* Praticar aprendizados de containerização/microsserviços com Docker
* Aprender a fazer deploy de uma aplicação dividida em microsserviços na AWS
* ~~Não abandonar esse projeto no meio do caminho (:sweat_smile:)~~ Exercitar o projeto e criação de definições de pronto/MVPs dos meus projetos pessoais

## :pencil: Requisitos
* [X] Como usuário quero me conectar à um chat utilizando um nome da minha escolha
* [X] Como usuário quero mandar mensagens para meus amigos conectados no chat
* [X] Como usuário quero utilizar comandos no chat
* [X] Como usuário quero adicionar chatbots às minhas conversas
* [X] Como usuário quero interagir com chatbots através das mensagens enviadas
* [X] Como usuário quero jogar com meus amigos através dos chatbots

* [X] Como desenvolvedor quero criar um client para o servidor de chat
* [X] Como desenvolvedor quero criar um bot para o servidor de chat

## :construction: Restrições
* [X] Utilizar websockets (socket.io)
* [X] Bots devem se conectar com o chat como os usuários (usando canal de mensagens)
* [X] Nomes de usuário não devem ser repetidos
* [X] Outros usuários devem ver o resultado da execução dos comandos
  * Ex.: "/cafe" -> "\[Chat]: llbarbosas tomou um :coffee:"
