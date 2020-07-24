import DID from './DID';
import IDIDMethod from './IDIDMethod';
import * as config from '../config';
const didConfig = config.did
export default class DIDMethod implements IDIDMethod {
    methodName: string; // hypersign
    methodSpecificIdSyntax: string;
    constructor(idSyntax: string) {
        this.methodName = didConfig.method;
        this.methodSpecificIdSyntax = idSyntax;
    }

    /////// Method Operations: https://w3c.github.io/did-core/#method-operations

    // https://w3c.github.io/did-core/#create
    op_create() {
        //TODO:
        // Create DID
        const didInstance =  new DID(this.methodName);
        const did = didInstance.did();
        // Create DIDDoc
        
        // Associate DID with DIDDoc
        // Store the DID and DIDDoc into Registry
        return did;
    }

    op_read(DID: string){} 
    op_verify(DID: string){}

    // Ref: https://w3c.github.io/did-core/#update
    op_update(DID: string) {
        //TODO:
        // Fetch the DIDDoc of this DID
        // Change the conent of DIDDoc
        // Store the content into REgistry
    }

    // Ref: https://w3c.github.io/did-core/#deactivate
    op_deactivate(DID: string) {
        //TODO:
        // Same as update
    }
}
