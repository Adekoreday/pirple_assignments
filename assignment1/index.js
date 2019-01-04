var url = require('url');
var http = require('http');


var server = http.createServer((req,res)=>{

var parsedurl = url.parse(req.url,true);
path = parsedurl.pathname;
//using regex to trimm out my url path
var trimmedpath = path.replace(/^\/+|\/+$/g, '');
var queryStringObject = parsedurl.query;
//get the query string 
var querymsg =  JSON.stringify(queryStringObject);
// the route request handler
var handlerchoosen = typeof(router[trimmedpath]) !== 'undefined' ? router[trimmedpath] : router.default;
// the handler function call implementation
handlerchoosen((statuscode,object1)=>{
    var message = typeof(object1)=='object' ? object1 : {};
    var payloadString = JSON.stringify(object1);
    res.setHeader('Content-Type','application/json');
    res.writeHead(statuscode);
    res.write(trimmedpath);
    res.write(querymsg);
    res.end(payloadString);
    console.log("Returning this response: ", statuscode, payloadString);

});

});
server.listen(80,()=>{
console.log('hello client');
});
// handllers
var handlers= {
};

handlers.default= (callback)=>{

callback(406,{'name':'my name is Adeyemi-Adekorede am glad to be on pirple'});

}
handlers.goodbye=(callback)=>{
    callback(406,{'name':'Goodbye!!! glad to be on pirple'});
}
var router={
    'default':handlers.default,
    'bye':handlers.goodbye
};