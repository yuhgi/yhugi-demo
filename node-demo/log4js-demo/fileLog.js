'use strict';
const log4js = require('log4js');
log4js.configure('./log4js.json');
const accessLogger = log4js.getLogger('acccessLogger');
const errorLogger = log4js.getLogger('errorLogger');


for(let i=0;i<100000;i++){
    accessLogger.info("acccess message " + i);
}

for(let i=0;i<100000;i++){
    errorLogger.error("error message " + i);
}