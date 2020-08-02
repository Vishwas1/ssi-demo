# Linked Data Signature

## Linked Data 

The term Linked Data is used to describe a recommended best practice for exposing, sharing, and connecting information on the Web using standards, such as URLs, to identify things and their properties. When information is presented as Linked Data, other related information can be easily discovered and new information can be easily linked to it. Linked Data is extensible in a decentralized way, greatly reducing barriers to large scale integration. 


## Linked Data Signature 

With the increase in usage of Linked Data for a variety of applications, there is a need to be able to verify the authenticity and integrity of Linked Data documents. That authenticity and integrity can be maintained by appending a *proof*, by specifying a [signature suite] and a [proof purpose], with the linked data which can further be verified by verifer using signature suites.


### Signature Suites

The signature suite performs the cryptographic operation required to sign (or verify) a digital signature and includes information in a proof such as the `verificationMethod` identifier (aka creator) and the date the proof was created (aka created).

Its essentially a set of cryptographic primitives typically consisting of a [canonicalization algorithm](https://w3c-ccg.github.io/lds-ed25519-2018/#dfn-canonicalization-algorithm), a [message digest algorithm](https://w3c-ccg.github.io/lds-ed25519-2018/#dfn-message-digest-algorithm), and a [signature algorithm](https://w3c-ccg.github.io/lds-ed25519-2018/#dfn-signature-algorithm) that are bundled together by cryptographers for developers for the purposes of safety and convenience. 
   - Example: 
      - [Ed25519Signature2018](https://w3c-ccg.github.io/lds-ed25519-2018/)
         - Uses SHA-512 as mseesage digest algo and ED25519 as signature algorithm
      - RsaSignature2018
      - EcdsaSecp256k1Signature2019
      - JwsLinkedDataSignature
      - etc
   - [Here](https://w3c-ccg.github.io/ld-cryptosuite-registry/#introduction) is list of cryptographic suites
         

### Proof Purpose

The specific intent for the proof, the reason why an entity created it. Acts as a safeguard to prevent the proof from being misused for a purpose other than the one it was intended for. For example, a proof can be used for purposes of `authentication`, for asserting control of a Verifiable Credential (`assertionMethod`), and several others.


  - `authentication`: Indicates that a given proof is only to be used for the purposes of an authentication protocol.
  - `assertionMethod`: Indicates that a proof can only be used for making assertions, for example signing a Verifiable Credential. 
  - `keyAgreement`: Indicates that a proof is used for for key agreement protocols, such as Elliptic Curve Diffie Hellman key agreement used by popular encryption libraries.
  - `contractAgreement`: Indicates that a proof is used for proofs that an entity agrees to a contract. 
  
We can read more [here](https://w3c-ccg.github.io/ld-proofs/#proof-purpose)


## Demo

1. Creating cryptographic materials
2. Signing the sample doc
3. Verifying the signed doc

## Sample Doc

```json
// doc

{
    "@context": ["https://schema.org"],
    "@type": "https://schema.org/Person",
    "name": "Vishwas Anand",
    "url": "https://vishwas.netlify.app/",
    "image": "https://vishwas.netlify.app/author/admin/avatar_hu885ecffc73ca9d603f6cfbf02ec70754_85745_250x250_fill_q90_lanczos_center.jpg",
    "description": "Vishwas Anand is a developer turned researcher at Imaginea Labs. His research works include in the field of Blockchain, Cryptography and Security",
    "birthdate": "1993-11-16",
    "jobTitle": "Software Engineer"
}

```

## Controller (The user)

A link to a machine-readable object, such as a DID Document, that contains authorization relations that explicitly permit the use of certain verification methods for specific purposes. For example, a controller object could contain statements that restrict a public key to being used *only for signing Verifiable Credentials* and no other kinds of documents. Or it could contain statement that restrict publick key to used for *only for authentication* -  see the example below.

```js
//Controller
{
  '@context': 'https://w3id.org/security/v2',
  id: 'did:hsauth:vishwas',
  publicKey: [
    {
      '@context': 'https://w3id.org/security/v2',
      id: 'did:hsauth:vishwas#z6MknpatYMfHz3di8zdbHcWZfBHz4VDNfvmDD27Uf5eqZ6Aq',
      type: 'Ed25519VerificationKey2018',
      publicKeyBase58: '9NKqx7QreW9F2Vntc3Yip5jzEuwXG3WrX1CYpogpdsPT'
    }
  ],
  authentication: [
    'did:hsauth:vishwas#z6MknpatYMfHz3di8zdbHcWZfBHz4VDNfvmDD27Uf5eqZ6Aq'
  ]
}

```

## Signed Document

1. Get the cryptoSuite and purpose. Let's choose `Ed25519Signature2018` for suite and `authentication` as proof purpose.

```js
const cryptoSuite = new Ed25519Signature2018({
   verificationMethod: id,
   key: new Ed25519KeyPair({ privateKey2018, publicKey })
})

const purpose = new AuthenticationProofPurpose({
   challenge: 'ABC',
   domain: 'example.com'
})
```

2. Now that we have cryptosuite and purpose ready, lets go and sign our doument.

```js
const signed_doc = sign(doc, {cryptoSuite, purpose})
```

Result:

```json
{
   "@context":[
      "https://schema.org",
      "https://w3id.org/security/v1"
   ],
   "@type":"https://schema.org/Person",
   "name":"Vishwas Anand",
   "url":"https://vishwas.netlify.app/",
   "image":"https://vishwas.netlify.app/author/admin/avatar_hu885ecffc73ca9d603f6cfbf02ec70754_85745_250x250_fill_q90_lanczos_center.jpg",
   "description":"Vishwas Anand is a developer turned researcher at Imaginea Labs. His research works include in the field of Blockchain, Cryptography and Security",
   "birthdate":"1993-11-16",
   "jobTitle":"Software Engineer",
   "proof":{
      "type":"Ed25519Signature2018",
      "created":"2020-08-02T19:39:37Z",
      "verificationMethod":"did:hsauth:id#z6MksKyyRftdAMhP6kniriC84DCZPXw5c8q2RkckipjmAakR",
      "proofPurpose":"authentication",
      "challenge":"ABC",
      "domain":"example.com",
      "jws":"eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..XjNAx0kIov_oUdXqX_6D6mkshP8oa6227v0SArfLHq2I5IkKDU26713g2onTPBqALDmlskAIuEKQRLXmfpJaDQ"
   }
}

```

## Verified Document

```js

// this time only publickey is required
const cryptoSuite = new Ed25519Signature2018({
   verificationMethod: id,
   key: new Ed25519KeyPair(publicKey)
})

// here we also need to add the controller of this crypt
const purpose = new AuthenticationProofPurpose({
   controller,
   challenge: 'ABC',
   domain: 'example.com'
})
```

Finally verify

```js
await verify(signed_doc, { cryptoSuite, purpose })

```

Result

```json
// verify
{
   "verified":true,
   "results":[
      {
         "proof":{
            "@context":"https://w3id.org/security/v2",
            "type":"Ed25519Signature2018",
            "created":"2020-08-02T19:39:37Z",
            "verificationMethod":"did:hsauth:id#z6MksKyyRftdAMhP6kniriC84DCZPXw5c8q2RkckipjmAakR",
            "proofPurpose":"authentication",
            "challenge":"ABC",
            "domain":"example.com",
            "jws":"eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..XjNAx0kIov_oUdXqX_6D6mkshP8oa6227v0SArfLHq2I5IkKDU26713g2onTPBqALDmlskAIuEKQRLXmfpJaDQ"
         },
         "verified":true,
         "purposeResult":{
            "valid":true,
            "controller":{
               "@context":"https://w3id.org/security/v2",
               "id":"did:hsauth:vishwas",
               "publicKey":[
                  {
                     "@context":"https://w3id.org/security/v2",
                     "id":"did:hsauth:id#z6MksKyyRftdAMhP6kniriC84DCZPXw5c8q2RkckipjmAakR",
                     "type":"Ed25519VerificationKey2018",
                     "publicKeyBase58":"DsivqReBppCuzFx2B9EHD7eZZxfECFafjjhptYmkFMy3"
                  }
               ],
               "authentication":[
                  "did:hsauth:id#z6MksKyyRftdAMhP6kniriC84DCZPXw5c8q2RkckipjmAakR"
               ]
            }
         }
      }
   ]
}
```

---

Checkout the full demo [here](https://github.com/hypersign-protocol/core/blob/master/examples/linked-data-signature/index.js)

## Resources

- https://schema.org/
- https://search.google.com/structured-data/testing-tool/u/0/
- https://json-ld.org/playground/
- https://json-ld.org/learn.html
- https://github.com/digitalbazaar/jsonld.js
- https://github.com/digitalbazaar/crypto-ld
- https://w3c-ccg.github.io/ld-cryptosuite-registry/
- https://w3c-ccg.github.io/ld-proofs/
- https://w3c-ccg.github.io/security-vocab/
- https://github.com/digitalbazaar/jsonld-signatures
- https://decentralized-id.com/rwot-dir/rwot2-id2020/draft-documents/blockchain-extensions-for-linked-data-signatures/ 
- https://decentralized-id.com/
- https://w3c-ccg.github.io/ld-cryptosuite-registry/

