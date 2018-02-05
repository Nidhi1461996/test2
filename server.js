const Hapi = require('hapi');
const axios = require('axios');
const http = require('https');

const server = new Hapi.Server();
server.connection({ port: 8085 });

function handlerFunc(request, reply) {
  const data = '';
  const data2 = '';
  http.get('https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allBooks', (resp) => {
    resp.on('data', (data1) => {
      data += data1;
      resp.on('end', () => {
        // console.log(JSON.parse(data));
        data = JSON.parse(data);
        const len = data.books.length;
        const ratings = [];
        for (let i = 0; i < len; i += 1) {
          // ids[i] = data.books[i].id;
          const url = 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findBookById/';
          http.get(`https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findBookById/${data.books[i].id}`, (response) => {
            response.on('data', (rating) => {
              data2 += rating;
            });
            response.on('end', () => {
              console.log(data2);
              // reply(JSON.parse(data2));
            });
          });
        }
        reply(data2);
      });
    }).on('error', (error) => {
      console.log(`Error is: ${error.message}`);
    });
  });

//   Promise.all([promise1, promise2, promise3]).then(function(values) {
//   console.log(values);
// });
// }

server.route({ method: 'GET', path: '/', handler: handlerFunc });
server.start((err) => {
  if (err) {
    throw err;
  }
  console.log(`Server running at: ${server.info.uri}`);
});

module.exports = server;
