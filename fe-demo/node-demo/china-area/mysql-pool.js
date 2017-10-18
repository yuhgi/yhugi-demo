var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit:10,
    host : '60.205.181.95',
    user: 'crawler',
    password: 'crawler',
    database:'light-chaser'
});

module.exports = pool;