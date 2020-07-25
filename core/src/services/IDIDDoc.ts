import VerificationRelationShips from './VerificationRelationShips';
import Service from './Service';
import Proof from './Proof';
import { JwsVerificatioMethod, Ed25519VerificationMethod, Secp256k1VerificationMethod } from './VerificationMethods';

// Description: A DID document contains information associated with the DID, such as ways to cryptographically authenticate the DID controller, as well as services that can be used to interact with the DID subject. 
// Properties: https://w3c.github.io/did-spec-registries/#properties
export default interface IDIDDoc {
    context: string;
    id: string;
    controller: string;

    verficationRelationShip: VerificationRelationShips;
    verificationMethod: Array<JwsVerificatioMethod | Ed25519VerificationMethod | Secp256k1VerificationMethod>


    services: Array<Service>;
    proof: Proof;

    timestamp: number;
    created: string;
    updated: string;

    signature: {};
}
