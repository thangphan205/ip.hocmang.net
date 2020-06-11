import request from 'umi-request';

export async function queryIPAddress() {
    return request('http://localhost:8002/api/ipv4/', {
    })
}

export async function IPv4Ping(params) {
    return request('http://localhost:8002/api/ipv4/ping', {
        params
    })
}
export async function IPv4Traceroute(params) {
    return request('http://localhost:8002/api/ipv4/traceroute', {
        params
    })
}