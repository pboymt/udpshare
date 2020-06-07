declare module 'multicast-dns' {

    import { AddressInfo } from "dgram";
    import { EventEmitter } from "events";

    function multicastdns(options?: MulticastDNSOptions) {
        return new MulticastDNS(options);
    }

    interface MulticastDNSOptions {
        multicast?: boolean; // use udp multicasting
        interface?: string; // explicitly specify a network interface. defaults to all
        port?: number; // set the udp port
        ip?: string; // set the udp ip
        ttl?: number; // set the multicast ttl
        loopback?: boolean; // receive your own packets
        reuseAddr?: boolean; // set the reuseAddr option when creating the socket (requires node >=0.11.13)
    }

    type PacketType = 'SRV' | 'A' | 'PTR' | 'TXT' | 'AAAA' | 'HINFO';

    interface PacketQuestion {
        name: string;
        type: PacketType
    }

    interface PacketAnswer<T> {
        name: string;
        type: PacketType
        ttl?: number;
        data: T;
    }

    interface Packet {
        questions?: PacketQuestion[],
        answers?: PacketAnswer<string | object>[],
        additionals?: PacketAnswer<Buffer>[],
        authorities?: PacketAnswer<Buffer>[],
    }

    class MulticastDNS extends EventEmitter {

        constructor(options?: MulticastDNSOptions);

        on(event: 'query', callback: (packet: Packet, rinfo: AddressInfo) => void);

        on(event: 'response', callback: (packet: Packet, rinfo: AddressInfo) => void);

        query(packet: Packet | PacketQuestion[], callback?: () => void);
        query(name: string, type: PacketType);

        respond(packet: Packet | PacketAnswer[], callback?: () => void);
    }

    export = multicastdns;

}