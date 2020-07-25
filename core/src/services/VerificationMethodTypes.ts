////
// // Ref: https://w3c.github.io/did-spec-registries/#verification-method-types
////


// Ref: https://tools.ietf.org/html/rfc7517
export interface IJWKPublicKey{
    /*
        {
          "crv": "Ed25519",
          "x": "VCpo2LMLhn6iWku8MKvSLg2ZAoC-nlOyPVQaO3FxVeQ",
          "kty": "OKP",
          "kid": "_Qq0UL2Fq651Q0Fjd6TvnYE-faHiOpRlPVQcY_-tA4A"
        }
     */
       crv: string;
       x: string;
       kty: string;
       kid: string;
    }

export class JwsVerificationKey2020{
    type: string;
    publicKeyJwk: IJWKPublicKey;
    constructor(key: {}){
        this.publicKeyJwk = {
            crv: "",
            x: "",
            kty: "",
            kid: "",
          }
        this.type = "JwsVerificationKey2020"
    }
}


export class Ed25519VerificationKey2018{
    publicKeyBase58: string
    type: string;
    constructor(key: string){
        this.publicKeyBase58 = key;
        this.type = "Ed25519VerificationKey2018";
    }
}

export class Secp256k1VerificationKey2018{
    publicKeyHex: string;
    type: string;
    constructor(key: string){
        this.publicKeyHex = key;
        this.type = "Secp256k1VerificationKey2018";
    }
}




