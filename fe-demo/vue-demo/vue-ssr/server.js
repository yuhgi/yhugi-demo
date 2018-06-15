const Vue = require('vue');
const server = require('express')();
const fs = require('fs');
const {createBundleRenderer} = require('vue-server-renderer');

const serverBundle = require('./dist/server.bundle.json');
const clientManifest = require('./dist/client.manifest.json');
const template = fs.readFileSync('./template/index.template.html','utf-8');

const renderer = createBundleRenderer(serverBundle,{
    runInNewContext:false,
    template,
    clientManifest
});
const createApp = require('./dist/built-server-bundle.js');

const port = 8080;

server.get('*', (req, res) => {
    // const app = createApp({
    //     url:req.url
    // });

    // const context = {
    //     title:'hello',
    //     meta:`
    //         <meta/>
    //     `
    // };

    const context = {
        url:req.url
    };

    renderer.renderToString( context, (err, html) => {
        if (err) {
            if(err.code === 404){
                res.status(404).end('Page not found');
            }else{
                res.status(500).end('Internal Server Error');
            }
            return;
        }
        res.end(html);
    });
});

server.listen(port,(err) => {
    if(err){
        throw err;
    }
    console.log(`vue-render-server is listenning on port ${port}`);
});



