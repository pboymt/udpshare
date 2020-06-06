

declare module "discovery-swarm" {

    import { Stream } from "stream";


    function swarm(opt?: SwarmOptions) {
        return new Swarm(opt);
    }

    export interface SwarmOptions {
        id: string; // peer-id for user
        stream: Stream; // stream to replicate across peers
        connect: Function; // connect local and remote streams yourself
        utp: boolean; // use utp for discovery
        tcp: boolean; // use tcp for discovery
        maxConnections: number; // max number of connections.
        whitelist: string[]; // array of ip addresses to restrict connections to
        keepExistingConnections: boolean;
    }

    export interface SwarmJoinOptions {
        announce: boolean;
    }

    export interface SwarmPeer {
        channel: Buffer; // the channel this connection was initiated on.
        host: string; // the remote address of the peer.
        port: number; // the remote port of the peer.
        id: string; // the remote peer's peer-id.
        retries: number;
    }

    export interface SwarmInfo {

        type: 'tcp' | 'utp'; // the type, tcp or utp.
        initiator: boolean; // whether we initiated the connection or someone else did.
        channel: Buffer; // the channel this connection was initiated on. only set if initiator === true.
        host: string; // the remote address of the peer.
        port: number; // the remote port of the peer.
        id: Buffer; // the remote peer's peer-id.

    }

    class Swarm {

        constructor(opts: SwarmOptions);

        join(key: string | Buffer, opts?: SwarmJoinOptions, firstRoundCallback?: () => void);

        leave(key: string | Buffer);

        connecting: number;

        queued: number;

        connected: number;

        on(event: 'peer', callback: (peer: SwarmPeer) => void);

        on(event: 'peer-banned', callback: (peerAddress: SwarmPeer, details) => void);

        on(event: 'peer-rejected', callback: (peerAddress: SwarmPeer, details) => void);

        on(event: 'drop', callback: (peer: SwarmPeer) => void);

        on(event: 'connecting', callback: (peer: SwarmPeer) => void);

        on(event: 'connect-failed', callback: (peer: SwarmPeer, details: { timedout: boolean }) => void);

        on(event: 'handshaking', callback: (connection: Stream, info: SwarmInfo) => void);

        on(event: 'handshake-timeout', callback: (connection: Stream, info: SwarmInfo) => void);

        on(event: 'connection', callback: (connection: Stream, info: SwarmInfo) => void);

        on(event: 'connection-closed', callback: (connection: Stream, info: SwarmInfo) => void);

        on(event: 'redundant-connection', callback: (connection: Stream, info: SwarmInfo) => void);

        listen(port: number);

    }

    export = swarm;

}