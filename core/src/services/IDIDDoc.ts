import Secp256k1SignatureAuthentication2018 from './VerificationRelationShips';
import Service from './Service';
import Proof from './Proof';
import { JwsVerificatioMethod, Ed25519VerificationMethod, Secp256k1VerificationMethod } from './VerificationMethods';

// Description: A DID document contains information associated with the DID, such as ways to cryptographically authenticate the DID controller, as well as services that can be used to interact with the DID subject. 
// Properties: https://w3c.github.io/did-spec-registries/#properties
export default interface IDIDDoc {
    context:string
    id: string;
    controller: string;

    authentication: Array<Secp256k1SignatureAuthentication2018>;
    publicKey: Array<JwsVerificatioMethod | Ed25519VerificationMethod | Secp256k1VerificationMethod>

    created: number;
    updated: number;

    services?: Array<Service>;
    proof?: Proof;
    
    signature?: {};

    // TODO
    // Ref: https://github.com/ethereum/EIPs/issues/1056
    //changeOwner(newOwner) // change the owner of this doc
    //setAttribute(key, value) // add a new attribute
    //revokeAttribute(, value) // remove a new attribute
}
