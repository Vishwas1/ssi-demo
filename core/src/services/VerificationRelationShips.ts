// A DID document expresses the relationship between the DID subject and a verification method using a verification relationship. 
// Ref: https://w3c.github.io/did-core/#verification-relationships




///// Authentication
//Ref: https://www.w3.org/TR/did-core/#authentication
/**
 * {
  "@context": "https://www.w3.org/ns/did/v1",
  "id": "did:example:123456789abcdefghi",
  "authentication": [
    "did:example:123456789abcdefghi#keys-1",
    "did:example:123456789abcdefghi#biometric-1",
    {
      "id": "did:example:123456789abcdefghi#keys-2",
      "type": "Ed25519VerificationKey2018",
      "controller": "did:example:123456789abcdefghi",
      "publicKeyBase58": "H3C2AVvLMv6gmMNam3uVAjZpfkcJCwDwnZn6z3wXmqPV"
    }
  ],
}
 */

enum VerificationRelationShipNames{
    "authentication",
    "assertionMethod",
    "keyAgreement",
    "capabilityInvocation"
}

enum VerificationReationShipTypes{
  "Secp256k1SignatureAuthentication2018",
  ""
}

export default class VerificationRelationShips{
  name: VerificationRelationShipNames;
  type: VerificationReationShipTypes
  constructor(name :VerificationRelationShipNames, type :VerificationReationShipTypes){
    this.name = name;
    this.type = type;
  }
}

////// assertionMethod
// Ref: https://www.w3.org/TR/did-core/#assertionmethod
// The assertionMethod property is used to express a verification relationship which indicates that a 
// verification method can be used to assert a statement on behalf of the DID subject. 


/**
 * {
  "@context": "https://www.w3.org/ns/did/v1",
  "id": "did:example:123456789abcdefghi",
  "assertionMethod": [
    "did:example:123456789abcdefghi#keys-1",
    {
      "id": "did:example:123456789abcdefghi#keys-2",
      "type": "Ed25519VerificationKey2018",
      "controller": "did:example:123456789abcdefghi",
      "publicKeyBase58": "H3C2AVvLMv6gmMNam3uVAjZpfkcJCwDwnZn6z3wXmqPV"
    }
  ],
}
 */


////// keyAgreement
// Ref: https://w3c.github.io/did-core/#keyagreement
// The keyAgreement property is used to express a verification relationship which an entity can use to engage in key agreement protocols on behalf of the DID subject.