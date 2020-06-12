import request from 'umi-request';
import { URL_API } from '../config';
export async function queryIPv6Address() {
    return request(URL_API + '/ipv6/', {
    })
}

export async function IPv6Ping(params) {
    return request(URL_API + '/ipv6/ping', {
        params
    })
}
export async function IPv6Traceroute(params) {
    return request(URL_API + '/ipv6/traceroute', {
        params
    })
}