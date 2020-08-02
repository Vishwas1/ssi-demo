



Why?

It is common practice to protect sensitive website API functionality via authentication mechanisms. Often, the entity accessing these APIs is a piece of automated software outside of an interactive human session. While there are mechanisms like OAuth and API secrets that are used to grant API access, each have their weaknesses such as unnecessary complexity for particular use cases or the use of shared secrets which may not be acceptable to an implementer.



Digital signatures are widely used to provide authentication without the need for shared secrets. They also do not require a round-trip in order to authenticate the client. A server need only have a mapping between the key being used to sign the content and the authorized entity to verify that a message was signed by that entity.

> For high security transactions, having an additional signature on the HTTP header allows a client to ensure that even if the transport channel has been compromised, that the content of the messages have not been compromised. 

## HTTP Signature Header

A HTTP Signature Header mechanism that can be used by a client to authenticate the sender of a message and ensure that particular headers have not been modified in transit.

Params:

- `keyId [REQUIRED]`: String that the server can use to look up t   he component they need to validate the signature. It could be an SSH key fingerprint, a URL to machine-readable key data, an LDAP DN, etc.  
- `algorithm [REQUIRED]`: Is used to specify the digital signature algorithm to use when generating the signature.
- `headers [OPTIONAL]`: 





// header at client end
{
   'x-auth-token': 'authentication toked',
   'x-payment-header': 'tx_ASDADJASDAJD....',
   'x-payment-updates': '[]',
   'x-payment-blockhash': 'kh_asDADADASDDA123',
   host: 'localhost:5001',
   date: 'Thu, 30 Jul 2020 19:39:41 GMT',
   authorization: 'Signature keyId="/home/viswas/work/pramati/ae-lab/api/routes/keys/cert.pem",algorithm="rsa-sha256",signature="wcTlnLhq8BBjHAKsPBz2KhzG87fGjyyNgixft7BL+kp9OCBNTmSQLnD6rhSDXRzII6Z4o+jq/icdrzl7diiog4ujgdkNLH1yghlpKPKats5SdGixyDekildISUHUW7uFSWEufMIXs4UI+XXzc2dBk3EMdp1JYM7NQeBCGbJlVA0="'
 }


//parsed at the server end
{
   scheme: 'Signature',
   params: {
     keyId: '/home/viswas/work/pramati/ae-lab/api/routes/keys/cert.pem',
     algorithm: 'rsa-sha256',
     signature: 'wcTlnLhq8BBjHAKsPBz2KhzG87fGjyyNgixft7BL+kp9OCBNTmSQLnD6rhSDXRzII6Z4o+jq/icdrzl7diiog4ujgdkNLH1yghlpKPKats5SdGixyDekildISUHUW7uFSWEufMIXs4UI+XXzc2dBk3EMdp1JYM7NQeBCGbJlVA0=',
     headers: [ 'date' ]
   },
   signingString: 'date: Thu, 30 Jul 2020 19:39:41 GMT',
   algorithm: 'RSA-SHA256',
   keyId: '/home/viswas/work/pramati/ae-lab/api/routes/keys/cert.pem',
   opaque: undefined
 }




## ref

- https://tools.ietf.org/html/draft-cavage-http-signatures-11#section-2.1
- https://medium.com/@technospace/ensuring-message-integrity-with-http-signatures-86f121ac9823
- https://web-payments.org/specs/source/http-signatures/#sig-rsa-example
- https://medium.com/transmute-techtalk/linked-data-proofs-vs-jose-why-not-both-1594393418cc