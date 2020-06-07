import multicastdns from 'multicast-dns';
import { networkInterfaces } from 'os';

const mdns = multicastdns();

// if (process.argv.includes('--client')) {
//     mdns.on('response', (packet, rinfo) => {
//         console.log(packet, rinfo);
//     });
//     mdns.query({
//         questions: [{
//             name: 'brunhilde.local',
//             type: 'A'
//         }]
//     });
// } else {
//     mdns.on('query', (packet, rinfo) => {

//     });
// }

if (process.argv.includes('--client')) {

    mdns.on('response', function (response, rinfo) {
        console.log('got a response packet:', response, rinfo)
    })

    mdns.query({
        questions: [{
            name: 'share.pboymt.local',
            type: 'A'
        }]
    })

} else {

    mdns.on('query', function (query, rinfo) {
        console.log('got a query packet:', query, rinfo)

        const ifaces = networkInterfaces();
        const lan_ips: string[] = [];

        for (const iface in ifaces) {
            if (ifaces.hasOwnProperty(iface)) {
                const infos = ifaces[iface];
                if (infos) {
                    for (const info of infos) {
                        if (!info.internal && !['255.255.255.255', 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff'].includes(info.netmask)) {
                            lan_ips.push(info.address);
                        }
                    }
                }
            }
        }

        mdns.respond({
            answers: lan_ips.map(ip => {
                return {
                    name: 'share.pboymt.local',
                    type: 'A',
                    data: ip
                }
            })
        })
    })


}



// lets query for an A record for 'brunhilde.local'

