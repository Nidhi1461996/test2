
function handlerFunc(request, reply) {
  return reply('Hello hapi!');
}

server.route({ method: 'GET', path: '/', handler: handlerFunc });
