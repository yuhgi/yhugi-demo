try{
    const m = 1;
    const n = m+z;
}catch(err){
    console.log(err.stack);
}


const fs = require("fs");
fs.readFile('a file that does not exist', (err,data) => {
    if(err){
        console.error('There was an error reading the file!',err);
        return;
    }
});