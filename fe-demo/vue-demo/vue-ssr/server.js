const fs = require('fs');
const path = require('path');
const LRU = require('lru-cache');
const express = require('express');
const favicon = require('serve-favicon');
const compression = require('compression');
const microcache = require('route-cache');
const {createBundleRenderer} = require('vue-server-renderer');

const isProd = process.env.NODE_ENV === 'production';
const serverInfo = `express/${require('express/package.json').version} vue-server-renderer/${require('vue-server-renderer/package.json').version}`;

const app = express();
const port = process.env.PORT||8080;

function createRenderer(bundle,options){
    return createBundleRenderer(bundle,Object.assign(options,{
        // for component cache
        cache:LRU({
            max:1000,
            maxAge: 1000 * 60 * 15
        }),
        basedir:path.resolve(__dirname,'./dist'),
        runInNewContext:false
    }));
}

let renderer,readyPromise;

const templatePath = path.resolve(__dirname,'./template/index.template.html');

if(isProd){
    const template = fs.readFileSync(templatePath,'utf-8');
    const serverBundle = require('./dist/vue-ssr-server-bundle.json');
    const clientManifest = require('./dist/vue-ssr-client-manifest.json');
    renderer = createRenderer(serverBundle,{
        runInNewContext:false,
        template,
        clientManifest,
    });
}else{
    readyPromise = '';
}

const serveStatic = (tPath,cache) => express.static(path.resolve(__dirname,tPath),{
    maxAge:cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
});

app.use(compression({threshold:0}));
app.use(favicon('./public/favicon.png'));
app.use('/dist',serveStatic('./dist',true));
app.use('/public',serveStatic('./public',true));

/**
 * @description 页面是否需要缓存
 * @param {Object} req 
 */
function isCacheable(req){
    return false;
}

// see https://www.nginx.com/blog/benefits-of-microcaching-nginx/
app.use(microcache.cacheSeconds(1,req => {
    const cacheable = isCacheable(req.url);
    return cacheable && req.originalUrl;
}));

function render(req,res){
    const s = Date.now();
    res.setHeader('Content-Type','text/html');
    res.setHeader('Server',serverInfo);

    const handleError = err => {
        if(err.url){
            res.redirect(err.url);
        }else if(err.code === 404){
            res.status(404).end('404 - Page not found');
        }else{
            res.status(500).end('500 - Internal Server Error');
            console.error(`error during render : ${req.url}`);
            console.error(err.stack);
        }
    };

    const context = {
        title:'Vue SSR DEMO',
        url:req.url
    };

    renderer.renderToString( context, (err, html) => {
        if (err) {
            return handleError(err);
        }
        res.send(html);
        if(!isProd){
            console.log(`url:${req.url},whole request: ${Date.now() - s}ms`);
        }
    });
}

app.get('*', isProd ? render : (req, res) => {
    readyPromise.then(() => render(req,res));
});

app.listen(port,(err) => {
    if(err){
        throw err;
    }
    console.log(`vue-render-server is listenning at localhost:${port}`);
});
