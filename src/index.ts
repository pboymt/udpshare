import swarm from "discovery-swarm";

var sw = swarm();

sw.join('updshare') // can be any id/name/hash

sw.on('connection', function (connection) {
    // console.log(connection);
    console.log('found + connected to peer');
    connection.on('message', (msg) => {
        console.log(msg);
    });
    connection.send('test');
});

sw.on('peer-banned', (peer, details) => {
    console.log('banned', JSON.stringify(peer), JSON.stringify(details));
});

sw.on('peer-rejected', (peer, details) => {
    console.log('rejected', JSON.stringify(peer), JSON.stringify(details));
});

sw.listen(8872);