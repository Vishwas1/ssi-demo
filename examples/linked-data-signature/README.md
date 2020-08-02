# Linked Data Signature

A Linked Data Signature proof is created (or verified) by specifying a signature suite and a proof purpose.

The signature suite performs the cryptographic operation required to sign (or verify) a digital signature and includes information in a proof such as the `verificationMethod` identifier (aka creator) and the date the proof was created (aka created).


## Sample Doc

```json
// doc

{
    "@context": "https://schema.org",
    "@type": "https://schema.org/Person",
    "name": "Vishwas Anand",
    "url": "https://vishwas.netlify.app/",
    "image": "https://vishwas.netlify.app/author/admin/avatar_hu885ecffc73ca9d603f6cfbf02ec70754_85745_250x250_fill_q90_lanczos_center.jpg",
    "description": "Vishwas Anand is a developer turned researcher at Imaginea Labs. His research works include in the field of Blockchain, Cryptography and Security",
    "address": {
        "@type": "https://schema.org/PostalAddress",
        "name": "Pramati Technology, Chennai",
        "addressCountry": "IN",
        "addressRegion": "Tamil Nadu",
        "addressLocality": "Perungudi",
        "streetAddress": "OMR",
        "postalCode": "803110"
    },
    "birthdate": "1993-11-16",
    "children":[
        {
            "@type": "https://schema.org/Person",
            "name": "Ani"
        }
    ],
    "jobTitle": "Software Engineer"
}

```

## Controller (The user)

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

```json
// signed

{
   "@context":"https://schema.org",
   "@type":"https://schema.org/Person",
   "name":"Vishwas Anand",
   "url":"https://vishwas.netlify.app/",
   "image":"https://vishwas.netlify.app/author/admin/avatar_hu885ecffc73ca9d603f6cfbf02ec70754_85745_250x250_fill_q90_lanczos_center.jpg",
   "description":"Vishwas Anand is a developer turned researcher at Imaginea Labs. His research works include in the field of Blockchain, Cryptography and Security",
   "address":{
      "@type":"https://schema.org/PostalAddress",
      "name":"Pramati Technology, Chennai",
      "addressCountry":"IN",
      "addressRegion":"Tamil Nadu",
      "addressLocality":"Perungudi",
      "streetAddress":"OMR",
      "postalCode":"803110"
   },
   "birthdate":"1993-11-16",
   "children":[
      {
         "@type":"https://schema.org/Person",
         "name":"Ani"
      }
   ],
   "jobTitle":"Software Engineer",
   "https://w3id.org/security#proof":{
      "@graph":{
         "type":"https://w3id.org/security#Ed25519Signature2018",
         "dct:created":{
            "type":"xsd:dateTime",
            "@value":"2020-08-01T18:08:21Z"
         },
         "https://w3id.org/security#challenge":"ABC",
         "https://w3id.org/security#domain":"example.com",
         "https://w3id.org/security#jws":"eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..LOPF7h3BY4d2ScRLnXZBaGjhZrZXqbg_ktx2Fr9W7AUloDmuI5DTzgH9m_kQtRStJWBvNDfbtXtm51spjb2LCQ",
         "https://w3id.org/security#proofPurpose":{
            "id":"https://w3id.org/security#authenticationMethod"
         },
         "https://w3id.org/security#verificationMethod":{
            "id":"did:hsauth:vishwas#z6MknpatYMfHz3di8zdbHcWZfBHz4VDNfvmDD27Uf5eqZ6Aq"
         }
      }
   }
}

```

## Verified Document

```json
// verify
{
   "verified":true,
   "results":[
      {
         "proof":{
            "@context":"https://w3id.org/security/v2",
            "type":"Ed25519Signature2018",
            "created":"2020-08-01T18:08:21Z",
            "challenge":"ABC",
            "domain":"example.com",
            "jws":"eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..LOPF7h3BY4d2ScRLnXZBaGjhZrZXqbg_ktx2Fr9W7AUloDmuI5DTzgH9m_kQtRStJWBvNDfbtXtm51spjb2LCQ",
            "proofPurpose":"authentication",
            "verificationMethod":"did:hsauth:vishwas#z6MknpatYMfHz3di8zdbHcWZfBHz4VDNfvmDD27Uf5eqZ6Aq"
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
                     "id":"did:hsauth:vishwas#z6MknpatYMfHz3di8zdbHcWZfBHz4VDNfvmDD27Uf5eqZ6Aq",
                     "type":"Ed25519VerificationKey2018",
                     "publicKeyBase58":"9NKqx7QreW9F2Vntc3Yip5jzEuwXG3WrX1CYpogpdsPT"
                  }
               ],
               "authentication":[
                  "did:hsauth:vishwas#z6MknpatYMfHz3di8zdbHcWZfBHz4VDNfvmDD27Uf5eqZ6Aq"
               ]
            }
         }
      }
   ]
}
```


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


