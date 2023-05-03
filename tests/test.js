import http from 'k6/http'
import { check, sleep } from 'k6'
import { Counter } from 'k6/metrics'

let ErrorCount = new Counter("errors")

export const options = {

    vus: 10,
    duration: "15s",
    thresholds: {
        errors: ["count<10"]
    }
}

export default function () {

    const path = Math.random() < 0.9 ? "200" : "500";
    let res = http.get(`https://requestly.dev/api/mockv2/${path}?rq_uid=S1pS71B1qiTIueeCWIhWwdAAdaw1`)

    let success = check(res, { "status is 200": r => r.status === 200 })

    if (!success) {
        ErrorCount.add(1)
    }

    sleep(1)

}