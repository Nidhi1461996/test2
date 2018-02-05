const Hapi = require('hapi');
const axios = require('axios');
const http = require('https');

const server = new Hapi.Server();
server.connection({ port: 8085 });

function handlerFunc(request, reply) {
  // axios.get('https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allBooks')
  //   .then((response) => {
  //     console.log(response.data);
  //     reply(response.data);
  //   });
  http.get('https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allBooks', (response) => {
    response.on('data', (data) => {
      response.setEncoding('UTF8');
      console.log(data.payload);
      reply(data.payload);
    });
  });
}

server.route({ method: 'GET', path: '/', handler: handlerFunc });
server.start((err) => {
  if (err) {
    throw err;
  }
  console.log(`Server running at: ${server.info.uri}`);
});

module.exports = server;
