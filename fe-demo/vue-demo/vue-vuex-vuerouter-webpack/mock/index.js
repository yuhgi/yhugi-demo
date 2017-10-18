const Mock = require('mockjs');

function start(app){
    app.post('/products/getProducts',(req,res) => {
        res.json({
            errCode:0,
            data:[
                {'id': 1, 'title': 'iPad 4 Mini', 'price': 500.01, 'inventory': 2},
                {'id': 2, 'title': 'H&M T-Shirt White', 'price': 10.99, 'inventory': 10},
                {'id': 3, 'title': 'Charli XCX - Sucker CD', 'price': 19.99, 'inventory': 5}
            ]
        });
    });
}

module.exports = start;