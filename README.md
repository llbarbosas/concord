<h1 align="center">
  quarentena-chat-server
</h1>

<h3 align="center">
  Chat realtime com nodejs e socket.io (e bots :robot::wave:)
</h3>

<p align="center">
  <a href="https://github.com/llbarbosas">
    <img alt="Made by Lucas Barbosa" src="https://img.shields.io/badge/made%20by-llbarbosas-4e5584?style=flat-square">
  </a>

  <img alt="License" src="https://img.shields.io/badge/licence-MIT-4e5584?style=flat-square">

  <a href="https://github.com/llbarbosas/quarentena-chat-server/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/llbarbosas/quarentena-chat-server?color=4e5584&style=flat-square">
  </a>
</p>

<p align="center">
  <a href="#rocket-sobre-o-projeto">Sobre o projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#runner-instalação">Instalação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">Licença</a>
</p>

## :rocket: Sobre o projeto
Em meio ao isolamento quarentena e com vários projetos pessoais na gaveta, decidi criar este projeto para exercitar aprendizados em realtime e me forçar a criar o hábito de finalizar projetos pessoais :sweat_smile:. Pra isso, [defini um MVP](docs/mvp.md) para ter como base. A ideia é que os usuários possam conversar e se divertir interagindo com os bots.

Você pode participar criando um client ou um bot para o chat (<a href="#possíveis-features-futuras">em breve</a>).

### Possíveis features futuras
* [ ] Suporte à chat rooms e direct messages
* [ ] Criar um microsserviço para autentificação e persistência dos usuários (nestjs e typeorm)
* [ ] Criar um microsserviço para administrar os bots (bot-manager), responsável por conectar eles ao servidor do chat. Tirar a lógica dos bots do servidor.
* [ ] Suporte à áudio e vídeo com webrtc (peerjs) e/ou grpc
* [ ] Testes com jest
* [ ] Criar uma lib para criação dos clients e bots com js (browser/node)
* [ ] Criar um client web com react
* [ ] Novos bots :robot:

## :runner: Instalação
```
// git clone ...

// Definir as variáveis do ambiente
cp .env.example .env

yarn install
yarn dev

// Em outro terminal, você pode testar o server
yarn test
```

## :memo: Licença

MIT Licence. See the file [LICENSE](LICENSE.md) for more details.
