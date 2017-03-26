const PORT = 8080; 
var http = require('http'); 
var fs = require('fs'); 
var url = require('url');
var path = require('path');

var server = http.createServer(function(req,res){
  var pathname = url.parse(req.url).pathname; 
  var realPath = path.join('项目根文件路径',pathname);
  console.log(realPath); 

  fs.readFile(realPath,function(err,data){
    if(err){
      //未找到文件
      res.writeHead(404,{
        'content-type':'text/html;charset="utf-8'
      });
      res.write('404,页面不在');
      res.end();
    }else{
      //成功读取文件
      res.writeHead(200,{
        'content-type':'text/html;charset="utf-8'
      });
      res.write(data);
      res.end();
    }
  })
});
server.listen(PORT); 
console.log('服务成功开启')