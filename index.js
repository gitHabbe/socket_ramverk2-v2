const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', socket => {
    console.log('a user connected');
    
    socket.on('close', (code, reason) => {
		console.log('TCL: reason', reason)
        console.log("code", code);
    })
    
    socket.on('msg', msg => {
        console.log('message: ', msg);
        io.emit("msg", msg);
    });

    socket.on('disconnect', test => {
        console.log('TCL: test', test)
        console.log('user disconnected');
        io.emit("userleave", "someone left");
    });
});



// Answer on all http requests
app.use((req, res) => {
    console.log("HTTP request on " + req.url);
    // io.emit("msg", "test");
    res.send({ msg: "hello" });
});

http.listen(3002, () => {
    console.log('listening on *:3002');
});
