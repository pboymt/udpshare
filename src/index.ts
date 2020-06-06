import swarm from "discovery-swarm";

var sw = swarm();

sw.listen(8872);
sw.join('updshare') // can be any id/name/hash

sw.on('connection', function (connection) {
    console.log('found + connected to peer');
});

sw.on('peer-banned', (peer, details) => {
    console.log('banned', details);
});

sw.on('peer-rejected', (peer, details) => {
    console.log('rejected', details);
});