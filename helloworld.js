let http = require('http');

http.createServer(function(request, response){
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end('<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmve3LlOi0V3sXXfZczxWmm5M4xNb0BvotIQ&s" alt="abacaxi bolado">');
}).listen(8888);


