function route(handle,pathname,response,request){
    console.log("about to route a request for " + pathname);
    if(typeof handle[pathname] === 'function'){
        return handle[pathname](response,request);
    }else {
        console.log('no request handler found for' + pathname);
        return "404 Not Found";
    }
}

module.exports = {
    route:route
};