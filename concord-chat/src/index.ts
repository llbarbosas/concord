import http from 'http';
import socketIo from 'socket.io';

const server = http.createServer();
const io = socketIo(server);

io.use((socket, next) => {
    const { id } = socket;
    const { token } = socket.request._query;

    console.log({ id, token });

    next();
});

io.of('/helloworld').use((socket, next) => {
    const { id } = socket;
    const { foo } = socket.request._query;

    console.log({ id, foo });

    next();
});

io.on('connection', socket => {
    console.log(socket.id);

    socket.on('message', message => console.log(message));
});

server.listen(3030, () => {
    console.log('listening on *:3030');
});