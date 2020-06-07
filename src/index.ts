import { createSocket } from "dgram";
import { randomBytes } from 'crypto';
import { networkInterfaces } from "os";

const socket4 = createSocket('udp4');
const id = randomBytes(8).toString('hex');
console.log(`Your ID:\t${id}`);

const multicast_ip = '225.0.0.100';

socket4.on('close', () => {
    console.log('client closed');
});

socket4.on('error', (err) => {
    console.log('client error' + err);
});

socket4.on('listening', () => {
    console.log('client listening...');
    socket4.setBroadcast(true);
    socket4.setMulticastTTL(128);
    socket4.addMembership(multicast_ip);
    setInterval(send_msg, 3000);
});

socket4.on('message', (msg, rinfo) => {
    if (local_ip_filter(rinfo.address)) {
        console.log(`{${rinfo.address}:${rinfo.port}}:\t${msg}`);
    }
});
socket4.bind(6733);

function local_ip_filter(address: string) {
    const ifaces = networkInterfaces();
    for (const ifname in ifaces) {
        if (ifaces.hasOwnProperty(ifname)) {
            const iface = ifaces[ifname];
            if (iface) {
                for (const info of iface) {
                    if (address === info.address) {
                        return false;
                    }
                }
            }
        }
    }
    return true;
}

function send_msg() {
    // console.log('send msg');
    socket4.send(id, 6733, multicast_ip);
}