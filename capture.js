const mongo = require("mongodb").MongoClient;
const url = "mongodb://******:49159";
const dbName = "anyproxy";


module.exports = {
    summary: 'a rule to hack response',
    flist: ['getGlobalData', 'init', 'xiangxiangapps.com/index'],
    * beforeSendRequest(requestDetail) {
        const key = 'pid'
        if (requestDetail.requestOptions.method === 'GET') {
            let u = new URL(requestDetail.url);
            u.searchParams.set(key, 'hello')
            requestDetail.url = u.toString()
        } else {
            let reqBody = requestDetail.requestData;
            const r = tryParse(reqBody.toString())
            const newBody = JSON.stringify(r)
            const n = Buffer.from(newBody)
            requestDetail.requestData = n
        }
    },
    * beforeSendResponse(requestDetail, responseDetail) {
        for (let l of this.flist) {
            if (requestDetail.url.includes(l)) {
                const b = {};
                b.reqUrl = requestDetail.url
                let reqBody = requestDetail.requestData;
                b.reqBody = tryParse(reqBody.toString());
                const resp = responseDetail.response
                const respBody = tryParse(resp.body.toString())

                if (requestDetail.url.includes('getGlobalData')) {

                    respBody.data.appver.AndroidForce = 0
                } else if (requestDetail.url.includes('init')) {
                    respBody.data.globalData.appver.AndroidForce = 0
                    respBody.data.appver.AndroidForce = 0
                }
                const newBody = JSON.stringify(respBody)
                const n = Buffer.from(newBody)
                b.respBody = respBody
                yield logger.info(b);
                resp.body = n
                return {response: resp};
            }
        }
    }
}

function tryParse(str) {
    try {
        return JSON.parse(str);

    } catch (e) {
        return str;
    }
}

const logger = {
    info: function* (msg) {
        console.info(msg)
        yield  mian(msg)

    }
}

function* mian(msg) {
    const client = yield mongo.connect(url)
    const s = client.db("anyproxy").collection("xj");
    yield s.insertOne(msg)
}


