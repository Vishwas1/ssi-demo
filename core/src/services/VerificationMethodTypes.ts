// Ref: https://w3c.github.io/did-spec-registries/#verification-method-types
export class JwsVerificationKey2020{
    name: string;
    publicKeyJwk: {}
    constructor(publicKey: {}){
        this.publicKeyJwk = publicKey
        this.name = "JwsVerificationKey2020"
    }
}


export class EcdsaSecp256k1VerificationKey2019{
    name: string;
    constructor(){
        this.name = "EcdsaSecp256k1VerificationKey2019"
    }
}


export class Ed25519VerificationKey2018{
    publicKeyBase58: string
    name: string;
    constructor(publicKey: string){
        this.publicKeyBase58 = publicKey;
        this.name = "Ed25519VerificationKey2018";
    }
}

export class Secp256k1VerificationKey2018{
    publicKeyHex: string;
    name: string;
    constructor(publicKey: string){
        this.publicKeyHex = publicKey;
        this.name = "Secp256k1VerificationKey2018";
    }
}

