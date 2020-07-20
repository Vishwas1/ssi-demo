## 

This module has core implementation of SSI - The Decentralized Identitfier (DID) infrastructue. It follows the [W3C DID v1.0 specification](https://w3c.github.io/did-core/). The module mainly implements DID and DID doc. Basically, DID infrastructure can be thought of as a global key-value database in which the database is all DID-compatible blockchains, distributed ledgers, or decentralized networks. In this virtual database, the key is a DID, and the value is a DID document.

```
{"key": "value"}
 ______      _________
|      |    |         |
| DID  | => | DID Doc |
|______|    |_________|
```

### DID

A DID is a special type of identifier which identifies a subject (like a person, org, thing, data mode, absctract entity etc.) that the controller of the DID decides that it identifies. In contrast to typical, federated identifiers, DIDs have been designed so that they may be decoupled from centralized registries, identity providers, and certificate authorities.

Specifically, while other parties might be used to help enable the discovery of information related to a DID, the design enables the controller of a DID to prove control over it without requiring permission from any other party.


```js
did:example:123456789abcdefghi
```

### DID Doc

The DID resolves to [DID document](https://w3c.github.io/did-core/#dfn-did-documents). A DID document contains information associated with the DID, such as ways to cryptographically authenticate the DID controller, as well as services that can be used to interact with the DID subject.

```json
{
  "@context": "https://www.w3.org/ns/did/v1",
  "id": "did:example:123456789abcdefghi",
  "authentication": [{
    "id": "did:example:123456789abcdefghi#keys-1",
    "type": "Ed25519VerificationKey2018",
    "controller": "did:example:123456789abcdefghi",
    "publicKeyBase58": "H3C2AVvLMv6gmMNam3uVAjZpfkcJCwDwnZn6z3wXmqPV"
  }],
  "service": [{
    "id":"did:example:123456789abcdefghi#vcs",
    "type": "VerifiableCredentialService",
    "serviceEndpoint": "https://example.com/vc/"
  }]
}

```


## DID creation flow

![img](../docs/DID-registrationflow.png)


Notes: 

- Here `Entity` could be any of the following: `A user`, `A issuer`, `A verfier`. They all has to be onboarded.
- [Here](https://sequencediagram.org/index.html#initialData=PTAOEMCcBcEsGNYQHbQAQEkDOWCuBTSAKBAhgSXFTQDVDYAzWQksKORFdAVS0IFoA6uAA2I-NCJE40cWgAiGeWgBK+AOaws0SODgB7ZGgYj9AdylkOlagFFUsaAE8iVilzQBlTxn4BZWAATQPEzKHwiexknfgA+b18A4NDwgC40YHhIfD18JVV8AEcCbTQAHSMABShwAFssdIBvNFBcACMRBABrfCc0AF8iZH1ofDR9ADdCLx9-IJD8MOz0gHF8ZEJcrAV8qkDy5G19bO3DNGzNbUgXBLnkxfC0fjiZ3zVLnSdUoZGxyenbu8tJ90p5oMd8NtoAALMaKZR7HbKeT6eBEQEaYHXJ5xW5JBZLfDpeHo2b4lLZHGxKKOL5IqQMxlAA) is the url to edit this image

## Installation


```bash
cd ssi-infra
mv .env.sample .env
npm i
npm run dev 
npm run build 
npm run start
```


## API Usage

