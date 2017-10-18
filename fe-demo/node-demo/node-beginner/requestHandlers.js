var querystring = require('querystring');
var fs = require("fs");
var formidable = require("formidable");

function start(response){
    console.log("request handler 'start' was called");
    html:5
    var body = '\
        <!DOCTYPE html>\
        <html lang="en">\
            <head><meta charset="UTF-8" />\
            <title>Start</title>\
            </head>\
            <body>\
                <form action="/upload" enctype="multipart/form-data" method="post">\
                    <input type="file" name="upload" id=""/>\
                    <input type="submit" value="Upload File" />\
                </form>\
            </body>\
        </html>\
    ';

    response.writeHead(200,{
        "Content-Type":"text/html"
    });
    response.write(body);
    response.end();
}

function upload(response,request){
    console.log("request handler 'upload' was called");
    var form = new formidable.IncomingForm();
    console.log("about ro parse");
    form.parse(request,function(error,fields,files){
        console.log("parse done");
        fs.readFile(files.upload.path, (error,data) => {
            if(error){
                response.writeHead(500,{
                    "Content-Type":"text/html"
                });
                response.write("<p>Whoops!Server is wrong!</p>");
            }else {
                fs.writeFile("./node-demo/node-beginner/tmp/test.png", data,(error) => {
                    if(error){
                        response.writeHead(500,{
                            "Content-Type":"text/html"
                        });
                        response.write("<p>Whoops!Server is wrong!</p>");
                    }else{
                        response.writeHead(200,{
                            "Content-Type":"text/html"
                        });
                        response.write("received image:<br/>");
                        response.write("<img src='/show'>");
                    }
                    response.end();
                });
            }
        });
    });
}

function show(response){
    console.log("request handler 'show' was called");
    fs.readFile("./node-demo/node-beginner/tmp/test.png","binary",function(error,file){
        if(error){
            response.writeHead(500,{
                "Content-Type":"text/plain"
            });
            response.write(error+"\n");
            response.end();
        }else{
            response.writeHead(200,{
                "Content-Type":"image/png"
            });
            response.write(file,"binary");
            response.end();
        }
    });
}

module.exports = {
    start:start,
    upload:upload,
    show:show
};