const Hapi = require('hapi');
const axios = require('axios');
const http = require('https');

const server = new Hapi.Server();
server.connection({ port: 8085 });

function handlerFunc(request, reply) {
  // axios.get('https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allBooks')
  //   .then((response) => {
  //     console.log(response);
  //     reply(response);
  //   });
  let data = '';
  http.get('https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allBooks', (resp) => {
    resp.on('data', (data1) => {
      data += data1;
      resp.on('end', () => {
        console.log(JSON.parse(data));
        data = JSON.parse(data);
        len = data.books.length;
        const ids = [];
        // for (let i = 0; i < len; i++) {
        //   //ids[i] = data.books[i].id;
        //   http.get('')
        // }
        reply(ids);
      });
    }).on('error', (error) => {
      console.log(`Error is: ${error.message}`);
    });
  });
  // http.get('https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allBooks', (response) => {
  //   response.on('data', (data) => {
  //     response.setEncoding('UTF8');
  //     console.log(JSON.parse(data));
  //     reply(JSON.parse(data));
  //   });
  // });
}

server.route({ method: 'GET', path: '/', handler: handlerFunc });
server.start((err) => {
  if (err) {
    throw err;
  }
  console.log(`Server running at: ${server.info.uri}`);
});

module.exports = server;
