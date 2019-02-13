'use strict';
const pool = require('./mysql-pool');

pool.query('select * from ota_area where parent_id = 1',function(err,results){
    if(err){
        return;
    }
    for(let result of results){
        console.log(result.name);
    }
});