/*

// cert.pem

-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDCFENGw33yGihy92pDjZQhl0C3
6rPJj+CvfSC8+q28hxA161QFNUd13wuCTUcq0Qd2qsBe/2hFyc2DCJJg0h1L78+6
Z4UMR7EOcpfdUE9Hf3m/hs+FUR45uBJeDK1HSFHD8bHKD6kv8FPGfJTotc+2xjJw
oYi+1hqp1fIekaxsyQIDAQAB
-----END PUBLIC KEY-----

// key.pem
-----BEGIN RSA PRIVATE KEY-----
MIICXgIBAAKBgQDCFENGw33yGihy92pDjZQhl0C36rPJj+CvfSC8+q28hxA161QF
NUd13wuCTUcq0Qd2qsBe/2hFyc2DCJJg0h1L78+6Z4UMR7EOcpfdUE9Hf3m/hs+F
UR45uBJeDK1HSFHD8bHKD6kv8FPGfJTotc+2xjJwoYi+1hqp1fIekaxsyQIDAQAB
AoGBAJR8ZkCUvx5kzv+utdl7T5MnordT1TvoXXJGXK7ZZ+UuvMNUCdN2QPc4sBiA
QWvLw1cSKt5DsKZ8UETpYPy8pPYnnDEz2dDYiaew9+xEpubyeW2oH4Zx71wqBtOK
kqwrXa/pzdpiucRRjk6vE6YY7EBBs/g7uanVpGibOVAEsqH1AkEA7DkjVH28WDUg
f1nqvfn2Kj6CT7nIcE3jGJsZZ7zlZmBmHFDONMLUrXR/Zm3pR5m0tCmBqa5RK95u
412jt1dPIwJBANJT3v8pnkth48bQo/fKel6uEYyboRtA5/uHuHkZ6FQF7OUkGogc
mSJluOdc5t6hI1VsLn0QZEjQZMEOWr+wKSMCQQCC4kXJEsHAve77oP6HtG/IiEn7
kpyUXRNvFsDE0czpJJBvL/aRFUJxuRK91jhjC68sA7NsKMGg5OXb5I5Jj36xAkEA
gIT7aFOYBFwGgQAQkWNKLvySgKbAZRTeLBacpHMuQdl1DfdntvAyqpAZ0lY0RKmW
G6aFKaqQfOXKCyWoUiVknQJAXrlgySFci/2ueKlIE1QqIiLSZ8V8OlpFLRnb1pzI
7U1yQXnTAEFYM560yJlzUpOb1V4cScGd365tiSMvxLOvTA==
-----END RSA PRIVATE KEY-----

*/


'use strict';
const { Router }  = require('express')
const router = Router()
const http = require('http')
const httpSignature = require('http-signature')
var fs = require('fs');

var key = fs.readFileSync('./key.pem', 'ascii');

router.get('/sign', (req, res)=>{
console.log('Inside sign')
    const options = {
        host: 'localhost',
        port: 5001,
        path: '/api/test/verify',
        method: 'POST',
        body: {
            num1: 12,
            num2: 13
        }
    }

    const request = http.request(options, (response) => {
        let str = ''
        response.on('data', (chunk) => {
            str += chunk;
        })
        response.on('end', () => {
            console.log(str)
            res.json(str)
        })
    })

    request.setHeader('x-auth-token', 'authentication token');
    request.setHeader('x-payment-header', 'tx_ASDADJASDAJD....');
    request.setHeader('x-payment-updates', '[]');
    request.setHeader('x-payment-blockhash', 'kh_asDADADASDDA123');

    httpSignature.sign(request, {
        key: key,
        keyId: './cert.pem'
    })
    console.log('After signing', request.getHeaders())
    request.end();
    console.log('After sending')
    
})
router.post('/verify',(req, res) => {
    const { headers} = req
    const parsed = httpSignature.parseRequest(req)
    console.log(parsed)
    const pub = fs.readFileSync(parsed.keyId, 'ascii');
    console.log(pub)
    if(!httpSignature.verifySignature(parsed, pub)){
        res.send({
            status: 'could note verify'
        }).status(401)
    }
    console.log('Receievd in /verify')
    res.json({
        status: 'Successfully verifed!',
        headers: JSON.stringify(headers),
        publicKey: pub,
        parsed
    })
})

module.exports = router
