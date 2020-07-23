/**
 * Verification method : can be used to authenticate or authorize interactions with the DID subject or associated parties.
 * For example, a public key can be used as a verification method with respect to a digital signature; in such usage, 
 * it verifies that the signer possessed the associated private key. 
 * Ref: https://w3c.github.io/did-spec-registries/#verification-method-types
 ** --------------- ------------------------------ ------------------------------ ---------------
 * JwsVerificationKey2020---------------------------
 * {
  "id": "did:example:123#_TKzHv2jFIyvdTGF1Dsgwngfdg3SH6TpDv0Ta1aOEkw",
  "type": "JwsVerificationKey2020",
  "controller": "did:example:123",
  "publicKeyJwk": {
    "crv": "P-256",
    "x": "38M1FDts7Oea7urmseiugGW7tWc3mLpJh6rKe7xINZ8",
    "y": "nDQW6XZ7b_u2Sy9slofYLlG03sOEoug3I0aAPQ0exs4",
    "kty": "EC",
    "kid": "_TKzHv2jFIyvdTGF1Dsgwngfdg3SH6TpDv0Ta1aOEkw"
  }
}

EcdsaSecp256k1VerificationKey2019 ----------------------
{
  "id": "did:example:123#WjKgJV7VRw3hmgU6--4v15c0Aewbcvat1BsRFTIqa5Q",
  "type": "EcdsaSecp256k1VerificationKey2019",
  "controller": "did:example:123",
  "publicKeyJwk": {
    "crv": "secp256k1",
    "x": "NtngWpJUr-rlNNbs0u-Aa8e16OwSJu6UiFf0Rdo1oJ4",
    "y": "qN1jKupJlFsPFc1UkWinqljv4YE0mq_Ickwnjgasvmo",
    "kty": "EC",
    "kid": "WjKgJV7VRw3hmgU6--4v15c0Aewbcvat1BsRFTIqa5Q"
  }
}

Ed25519VerificationKey2018-------------------------------
{
  "id": "did:example:123#ZC2jXTO6t4R501bfCXv3RxarZyUbdP2w_psLwMuY6ec",
  "type": "Ed25519VerificationKey2018",
  "controller": "did:example:123",
  "publicKeyBase58": "H3C2AVvLMv6gmMNam3uVAjZpfkcJCwDwnZn6z3wXmqPV"
}

 */



// 1. Publickey VM: A public key is a verification method. Public keys are used for digital signatures, encryption and other cryptographic operations, which in turn are the basis for purposes such as authentication or establishing secure communication with service endpoints
//                 Public keys can be included in a DID document using the publicKey or authentication properties, depending on what they are to be used for. https://w3c.github.io/did-core/#public-keys
// 2. 


import { Ed25519VerificationKey2018 } from './VerificationMethodTypes';

// One type of verification method
export default class PublicKeyVerificationMethod{
  id: string; //URI
  type: string;  // VerificationMethodTypes
  controller: string;
  publicKey: string | {} 

  constructor() {
    const vmt = new Ed25519VerificationKey2018("")
    this.id = "";
    this.type = vmt.name;
    this.controller = ""
    this.publicKey = vmt.publicKeyBase58
  }


}

