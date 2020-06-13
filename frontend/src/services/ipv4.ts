import request from 'umi-request';
import { URL_API } from '../config';
export async function queryIPAddress() {
    return request(URL_API + '/', {
    })
}

export async function IPv4Ping(params) {
    return request(URL_API + '/ipv4/ping', {
        params
    })
}
export async function IPv4Traceroute(params) {
    return request(URL_API + '/ipv4/traceroute', {
        params
    })
}