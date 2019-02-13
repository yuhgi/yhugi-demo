'use strict';
const Area = require('./china-area.json');
const pool = require('./mysql-pool');

const China = Area['86'];

function getShortName(name){
    let result = name;
    result = result.replace(/(省|市|(壮族|回族|维吾尔)?自治区|地区|林区|特别行政区|盟)$/,'');
    result = result.replace(/(朝鲜族|土家族苗族|藏族羌族|藏族|彝族|布依族苗族|苗族侗族|哈尼族彝族|壮族苗族|傣族|白族|傣族景颇族|傈僳族|回族|蒙古族藏族|蒙古|哈萨克|柯尔克孜)?自治州$/,'');
    result = result.replace(/((黎族|黎族苗族)?自治县)|县$/,'');
    return result;
}

console.log('---------------省级-------------------')
for(let provinceCode in China){
    let record = {
        areaCode:provinceCode,
        name:China[provinceCode],
        shortName:getShortName(China[provinceCode])
    };
    pool.query(`insert into ota_area(parent_id,name,short_name,e_name,area_code,level,enabled) 
        values(1,'${record.name}','${record.shortName}','','${record.areaCode}',2,false)`,function(err,results){
        if(err){
            console.log(err);
            return;
        }
        if(record.shortName === '北京'||
            record.shortName === '上海'||
            record.shortName === '天津'||
            record.shortName === '重庆'||
            record.shortName === '香港'||
            record.shortName === '澳门'){
            return;
        }
        let province = Area[provinceCode];
        for(let cityCode in province){
            let record = {
                areaCode:cityCode,
                name:province[cityCode],
                shortName:getShortName(province[cityCode])
            };
            pool.query(`insert into ota_area(parent_id,name,short_name,e_name,area_code,level,enabled) 
                values(${results.insertId},'${record.name}','${record.shortName}','','${record.areaCode}',2,false)`,function(err){
                console.log(err);
            });
        }
    });
    
}
