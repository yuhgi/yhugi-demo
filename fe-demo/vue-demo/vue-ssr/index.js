const Vue = require('vue');
const server = require('express')();
const fs = require('fs');
const renderer = require('vue-server-renderer').createRenderer({
    template:fs.readFileSync('./index.template.html','utf-8')
});

const port = 8080;

server.get('*', (req, res) => {
    const app = new Vue({
        data: {
            url: req.url
        },
        template: `<div>The visited URL is: {{ url }}</div>`
    });

    const context = {
        title:'hello',
        meta:`
            <meta/>
        `
    }

    renderer.renderToString(app, context, (err, html) => {
        if (err) {
            res.status(500).end('Internal Server Error');
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



