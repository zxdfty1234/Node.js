var http = require('http');
var fs = require('fs');
var url = require('url'); //'url'이라는 모듈을 url이라는 변수를 통해 사용할 것

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    var title = queryData.id;

    if(pathname =='/'){
      if(queryData.id == undefined){

          fs.readdir('./data',function(error, filelist){
            var title = 'Welcome';
            var description = 'Hello. node.js!';
            var list = '<ul>';

            var i = 0;
            while(i < filelist.length){
              list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
              i += 1;
            }

          list = list+'</ul>';
          var templete = `
          <!DOCTYPE html>
          <html>
          <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
          </head>
          <body>
            <h1><a href="/">WEB</a></h1>
            ${list}
            <h1>${title}</h1>
            <p>${description}</p>
          </body>
          </html>
          `;
          response.writeHead(200);
          response.end(templete);
        })
      }
      else{
        fs.readdir('./data',function(error, filelist){
          var title = `${queryData.id}`;
          var description = `data/${queryData.id}`;
          var list = '<ul>';

          var i = 0;
          while(i < filelist.length){
            list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
            i += 1;
          }
          fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
            var title = queryData.id;
            var templete = `
            <!DOCTYPE html>
            <html>
            <head>
              <title>WEB1 - ${title}</title>
              <meta charset="utf-8">
            </head>
            <body>
              <h1><a href="/">WEB</a></h1>
              ${list}
              <h1>${title}</h1>
              <p>${description}</p>
            </body>
            </html>
            `;
            response.writeHead(200);
            response.end(templete);
          });
      });
    }
  }
    else {
      response.writeHead(404);
      response.end('Not found');
    }


});
app.listen(3000);
